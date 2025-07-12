
-- Create notifications table for user notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('new_episode', 'new_comment', 'playlist_updated')),
  read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Add updated_at trigger for notifications
CREATE TRIGGER notifications_updated_at BEFORE UPDATE ON public.notifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to create notification for new episodes
CREATE OR REPLACE FUNCTION public.notify_new_episode()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notification for all users (in real app, this would be for subscribers only)
  INSERT INTO public.notifications (user_id, title, message, type, data)
  SELECT 
    id,
    'Nouvel épisode disponible !',
    'Un nouvel épisode "' || NEW.title || '" est maintenant disponible.',
    'new_episode',
    jsonb_build_object('episode_id', NEW.id, 'podcast_id', NEW.podcast_id)
  FROM auth.users;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create notifications when new episodes are added
CREATE TRIGGER on_episode_created
  AFTER INSERT ON public.episodes
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_episode();
