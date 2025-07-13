
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Playlist {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  playlist_items?: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  episode_id: string;
  playlist_id: string;
  created_at: string;
  episodes?: {
    id: string;
    title: string;
    description?: string;
    duration?: number;
    podcasts?: {
      title: string;
      cover_image_url?: string;
    };
  };
}

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      // First get playlists
      const { data: playlistsData, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Then get playlist items with episode data for each playlist
      const playlistsWithItems = await Promise.all(
        (playlistsData || []).map(async (playlist) => {
          const { data: itemsData } = await supabase
            .from('playlist_items')
            .select(`
              id,
              episode_id,
              created_at,
              episodes(
                id,
                title,
                description,
                duration,
                podcasts(title, cover_image_url)
              )
            `)
            .eq('playlist_id', playlist.id);

          return {
            ...playlist,
            playlist_items: (itemsData || []).map(item => ({
              ...item,
              playlist_id: playlist.id
            }))
          };
        })
      );

      setPlaylists(playlistsWithItems);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async (name: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('playlists')
        .insert({
          name,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setPlaylists(prev => [{ ...data, playlist_items: [] }, ...prev]);
      toast({
        title: "Playlist créée",
        description: `La playlist "${name}" a été créée avec succès.`,
      });
      
      return data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la playlist.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const addToPlaylist = async (playlistId: string, episodeId: string) => {
    try {
      const { data, error } = await supabase
        .from('playlist_items')
        .insert({
          playlist_id: playlistId,
          episode_id: episodeId
        })
        .select(`
          id,
          episode_id,
          created_at,
          episodes(
            id,
            title,
            description,
            duration,
            podcasts(title, cover_image_url)
          )
        `)
        .single();

      if (error) throw error;

      const itemWithPlaylistId = {
        ...data,
        playlist_id: playlistId
      };

      setPlaylists(prev =>
        prev.map(p =>
          p.id === playlistId
            ? { ...p, playlist_items: [...(p.playlist_items || []), itemWithPlaylistId] }
            : p
        )
      );

      toast({
        title: "Ajouté à la playlist",
        description: "L'épisode a été ajouté à votre playlist.",
      });
    } catch (error) {
      console.error('Error adding to playlist:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'épisode à la playlist.",
        variant: "destructive",
      });
    }
  };

  const removeFromPlaylist = async (playlistItemId: string, playlistId: string) => {
    try {
      const { error } = await supabase
        .from('playlist_items')
        .delete()
        .eq('id', playlistItemId);

      if (error) throw error;

      setPlaylists(prev =>
        prev.map(p =>
          p.id === playlistId
            ? {
                ...p,
                playlist_items: p.playlist_items?.filter(item => item.id !== playlistItemId) || []
              }
            : p
        )
      );

      toast({
        title: "Retiré de la playlist",
        description: "L'épisode a été retiré de votre playlist.",
      });
    } catch (error) {
      console.error('Error removing from playlist:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer l'épisode de la playlist.",
        variant: "destructive",
      });
    }
  };

  const deletePlaylist = async (playlistId: string) => {
    try {
      const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', playlistId);

      if (error) throw error;

      setPlaylists(prev => prev.filter(p => p.id !== playlistId));
      toast({
        title: "Playlist supprimée",
        description: "La playlist a été supprimée avec succès.",
      });
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la playlist.",
        variant: "destructive",
      });
    }
  };

  return {
    playlists,
    loading,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    refetch: fetchPlaylists
  };
};
