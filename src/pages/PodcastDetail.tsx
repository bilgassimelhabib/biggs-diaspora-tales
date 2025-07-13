import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Play, Clock, Calendar, Share2 } from "lucide-react";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import CommentSection from "@/components/CommentSection";
import PlaylistManager from "@/components/PlaylistManager";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Mock data - in a real app, this would come from Supabase
const mockPodcastData = {
  "1": {
    id: "1",
    title: "Voix de la Diaspora",
    description: "Un podcast explorant les histoires personnelles et les expériences des communautés de la diaspora africaine à travers le monde.",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Culture",
    episodes: [
      {
        id: "ep1",
        title: "Entre deux mondes : grandir multiculturel",
        description: "Dans cet épisode, nous explorons les défis et les richesses de grandir entre plusieurs cultures. Nos invités partagent leurs expériences personnelles et leurs réflexions sur l'identité multiculturelle.",
        duration: "45:30",
        date: "15 Nov 2024",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      },
      {
        id: "ep2", 
        title: "La cuisine comme pont culturel",
        description: "Comment la nourriture nous connecte à nos origines et nous permet de partager notre culture avec d'autres. Un voyage culinaire à travers les traditions familiales.",
        duration: "38:15",
        date: "8 Nov 2024",
        audioUrl: ""
      }
    ]
  },
  "2": {
    id: "2",
    title: "Rythmes Métissés", 
    description: "Découvrez comment la musique crée des ponts entre les cultures et unit les communautés de la diaspora mondiale.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Musique",
    episodes: [
      {
        id: "ep3",
        title: "L'Afrobeat moderne : fusion des générations",
        description: "Une exploration de l'évolution de l'Afrobeat et comment les jeunes artistes réinterprètent les classiques pour créer quelque chose de nouveau.",
        duration: "42:20",
        date: "12 Nov 2024",
        audioUrl: ""
      }
    ]
  },
  "3": {
    id: "3",
    title: "Histoires Créoles",
    description: "Plongez dans les récits authentiques des communautés créoles et découvrez leur riche patrimoine culturel.",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Histoire",
    episodes: [
      {
        id: "ep4",
        title: "Les traditions culinaires créoles",
        description: "Un voyage à travers les saveurs et les histoires qui se cachent derrière les plats traditionnels créoles.",
        duration: "52:22", 
        date: "10 Nov 2024",
        audioUrl: ""
      }
    ]
  }
};

const PodcastDetail = () => {
  const { id } = useParams();
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const podcast = id ? mockPodcastData[id as keyof typeof mockPodcastData] : null;

  useEffect(() => {
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (podcast && podcast.episodes.length > 0) {
      setSelectedEpisode(podcast.episodes[0]);
    }
  }, [podcast]);

  if (!podcast) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Podcast non trouvé</h1>
            <p className="text-muted-foreground">Le podcast que vous cherchez n'existe pas ou a été supprimé.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatDate = (date: string) => {
    return date;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Podcast Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <img
              src={podcast.coverImage}
              alt={podcast.title}
              className="w-full aspect-square object-cover rounded-lg shadow-elegant"
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge className="mb-3">{podcast.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{podcast.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {podcast.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Play className="h-5 w-5 mr-2" />
                Écouter le dernier épisode
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                Partager
              </Button>
              {isAuthenticated && selectedEpisode && (
                <PlaylistManager 
                  episodeId={selectedEpisode.id} 
                  episodeTitle={selectedEpisode.title}
                />
              )}
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Épisodes ({podcast.episodes.length})</h2>
            
            <div className="space-y-4">
              {podcast.episodes.map((episode, index) => (
                <Card 
                  key={episode.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedEpisode?.id === episode.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedEpisode(episode)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Episode {index + 1}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDuration(episode.duration)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(episode.date)}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{episode.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {episode.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedEpisode && selectedEpisode.audioUrl && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Lecture en cours</h3>
                </CardHeader>
                <CardContent>
                  <AudioPlayer
                    title={selectedEpisode.title}
                    audioUrl={selectedEpisode.audioUrl}
                  />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <h3 className="font-semibold">À propos de ce podcast</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {podcast.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        {selectedEpisode && isAuthenticated && (
          <div className="mt-12">
            <CommentSection episodeId={selectedEpisode.id} />
          </div>
        )}
        
        {selectedEpisode && !isAuthenticated && (
          <div className="mt-12 text-center">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-2">Rejoignez la conversation</h3>
                <p className="text-muted-foreground mb-4">
                  Connectez-vous pour laisser des commentaires et évaluer les épisodes.
                </p>
                <Button>Se connecter</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastDetail;
