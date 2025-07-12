
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  content: string;
  rating?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  episode_id: string;
  profiles?: {
    name: string;
    avatar_url?: string;
  };
}

export const useComments = (episodeId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (episodeId) {
      fetchComments();
    }
  }, [episodeId]);

  const fetchComments = async () => {
    if (!episodeId) return;
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles(name, avatar_url)
        `)
        .eq('episode_id', episodeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, rating?: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('comments')
        .insert({
          content,
          rating,
          episode_id: episodeId,
          user_id: user.id
        })
        .select(`
          *,
          profiles(name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setComments(prev => [data, ...prev]);
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès.",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateComment = async (commentId: string, content: string, rating?: number) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content, rating })
        .eq('id', commentId)
        .select(`
          *,
          profiles(name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setComments(prev =>
        prev.map(c => c.id === commentId ? data : c)
      );
      
      toast({
        title: "Commentaire modifié",
        description: "Votre commentaire a été mis à jour.",
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le commentaire.",
        variant: "destructive",
      });
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.filter(c => c.id !== commentId));
      toast({
        title: "Commentaire supprimé",
        description: "Le commentaire a été supprimé.",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le commentaire.",
        variant: "destructive",
      });
    }
  };

  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    refetch: fetchComments
  };
};
