
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'new_episode' | 'new_comment' | 'playlist_updated';
  read: boolean;
  data?: any;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    
    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as any;
          // Only add notification if it's for the current user
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user && newNotification.user_id === user.id) {
              const notification: Notification = {
                id: newNotification.id,
                title: newNotification.title,
                message: newNotification.message,
                type: newNotification.type as Notification['type'],
                read: newNotification.read,
                data: newNotification.data,
                created_at: newNotification.created_at,
              };
              
              setNotifications(prev => [notification, ...prev]);
              setUnreadCount(prev => prev + 1);
              
              // Show toast for new notification
              toast({
                title: notification.title,
                description: notification.message,
              });
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const typedNotifications: Notification[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        message: item.message,
        type: item.type as Notification['type'],
        read: item.read,
        data: item.data,
        created_at: item.created_at,
      }));

      setNotifications(typedNotifications);
      setUnreadCount(typedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
};
