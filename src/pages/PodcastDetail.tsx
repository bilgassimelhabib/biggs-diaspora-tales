import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Play, Share, Download, Clock, Calendar, Headphones } from "lucide-react";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";

// Mock data pour les épisodes
const podcastData = {
  "1": {
    title: "Voix de la Diaspora",
    description: "Un podcast explorant les histoires personnelles et les expériences des communautés de la diaspora africaine à travers le monde. Chaque épisode donne la parole à des personnalités inspirantes qui partagent leur parcours, leurs défis et leurs réussites.",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Culture",
    creator: "Amina Koné",
    totalEpisodes: 12,
    totalDuration: "8h 45min",
    language: "Français",
    episodes: [
      {
        id: "1",
        title: "Entre deux mondes : grandir multiculturel",
        description: "Témoignages de jeunes adultes ayant grandi entre plusieurs cultures et leur recherche d'identité.",
        duration: "45:30",
        date: "15 Nov 2024",
        audioUrl: "",
        isNew: true
      },
      {
        id: "2", 
        title: "Entrepreneuriat et diaspora : créer des ponts",
        description: "Rencontre avec des entrepreneurs de la diaspora qui développent des projets entre leurs pays d'origine et d'accueil.",
        duration: "52:15",
        date: "8 Nov 2024",
        audioUrl: ""
      },
      {
        id: "3",
        title: "L'art comme langage universel",
        description: "Comment les artistes de la diaspora utilisent leur créativité pour raconter leurs histoires et toucher un public mondial.",
        duration: "41:22",
        date: "1 Nov 2024",
        audioUrl: ""
      }
    ]
  },
  "2": {
    title: "Rythmes Métissés",
    description: "Découvrez comment la musique crée des ponts entre les cultures et unit les communautés de la diaspora mondiale.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Musique",
    creator: "Marcus Rivera",
    totalEpisodes: 8,
    totalDuration: "6h 12min",
    language: "Français",
    episodes: [
      {
        id: "1",
        title: "L'Afrobeat moderne : fusion des générations",
        description: "Exploration de l'évolution de l'Afrobeat et son influence sur la musique contemporaine mondiale.",
        duration: "38:15",
        date: "12 Nov 2024",
        audioUrl: "",
        isNew: true
      }
    ]
  }
};

const PodcastDetail = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = podcastData[id as keyof typeof podcastData];

  if (!podcast) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Podcast non trouvé</h1>
          <p className="text-muted-foreground">Le podcast que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: podcast.title,
        text: podcast.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Podcast Cover */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-podcast">
                <div className="aspect-square">
                  <img 
                    src={podcast.coverImage} 
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
            
            {/* Podcast Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{podcast.category}</Badge>
                <Badge variant="outline">{podcast.language}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{podcast.title}</h1>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {podcast.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-bold text-xl">{podcast.totalEpisodes}</div>
                  <div className="text-sm text-muted-foreground">Épisodes</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-bold text-xl">{podcast.totalDuration}</div>
                  <div className="text-sm text-muted-foreground">Durée totale</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-bold text-xl text-primary">#{Math.floor(Math.random() * 50) + 1}</div>
                  <div className="text-sm text-muted-foreground">Classement</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-bold text-xl">{podcast.creator}</div>
                  <div className="text-sm text-muted-foreground">Créateur</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-gradient-podcast text-white hover:shadow-glow">
                  <Play className="h-5 w-5 mr-2" />
                  Lire le premier épisode
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share className="h-5 w-5 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="lg">
                  <Headphones className="h-5 w-5 mr-2" />
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Épisodes ({podcast.episodes.length})</h2>
            <Button variant="outline">
              Voir tous les épisodes
            </Button>
          </div>
          
          <div className="space-y-6">
            {podcast.episodes.map((episode, index) => (
              <Card key={episode.id} className="hover:shadow-podcast transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-podcast rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{episode.title}</h3>
                        {episode.isNew && <Badge className="bg-primary text-xs">Nouveau</Badge>}
                      </div>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {episode.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {episode.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {episode.date}
                        </div>
                      </div>
                      
                      {/* Audio Player */}
                      <AudioPlayer
                        title={episode.title}
                        audioUrl={episode.audioUrl}
                        duration={episode.duration}
                        onShare={handleShare}
                        onDownload={() => console.log("Download episode")}
                        className="mb-4"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Podcasts */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Podcasts Similaires</h2>
          <div className="text-center text-muted-foreground">
            <p>Découvrez d'autres podcasts de la même catégorie...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastDetail;