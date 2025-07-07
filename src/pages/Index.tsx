
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Headphones } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import PodcastCard from "@/components/PodcastCard";
import { useNewsletter } from "@/hooks/useNewsletter";

// Mock data pour les podcasts
const featuredPodcasts = [
  {
    id: "1",
    title: "Voix de la Diaspora",
    description: "Un podcast explorant les histoires personnelles et les expériences des communautés de la diaspora africaine à travers le monde.",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Culture",
    episodeCount: 12,
    latestEpisode: {
      id: "1",
      title: "Entre deux mondes : grandir multiculturel",
      duration: "45:30",
      date: "15 Nov 2024",
      audioUrl: ""
    }
  },
  {
    id: "2", 
    title: "Rythmes Métissés",
    description: "Découvrez comment la musique crée des ponts entre les cultures et unit les communautés de la diaspora mondiale.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Musique",
    episodeCount: 8,
    latestEpisode: {
      id: "2",
      title: "L'Afrobeat moderne : fusion des générations",
      duration: "38:15",
      date: "12 Nov 2024", 
      audioUrl: ""
    }
  },
  {
    id: "3",
    title: "Histoires Créoles",
    description: "Plongez dans les récits authentiques des communautés créoles et découvrez leur riche patrimoine culturel.",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Histoire", 
    episodeCount: 15,
    latestEpisode: {
      id: "3",
      title: "Les traditions culinaires créoles",
      duration: "52:22",
      date: "10 Nov 2024",
      audioUrl: ""
    }
  }
];

const Index = () => {
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative container mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🎧 Nouveau média multiculturel
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Bigg's Media
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90">
              Cultures de la Diaspora Mondiale
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
              Découvrez des podcasts authentiques qui célèbrent la diversité, 
              racontent les histoires uniques des communautés de la diaspora 
              et créent des ponts entre les cultures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
                <Play className="h-5 w-5 mr-2" />
                <span className="text-primary font-semibold">Écouter maintenant</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
              >
                <Headphones className="h-5 w-5 mr-2" />
                <span className="text-white font-semibold">Découvrir nos podcasts</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Podcasts Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">🎙️ Nos Podcasts</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Histoires Authentiques
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plongez dans nos podcasts multiculturels qui donnent la parole 
              aux communautés de la diaspora mondiale et célèbrent leur richesse culturelle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} {...podcast} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/podcasts">
              <Button size="lg" variant="outline" className="group">
                <span className="text-primary font-semibold">Voir tous les podcasts</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">🌍 Notre Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Connecter les Cultures, Raconter les Histoires
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Bigg's Media est né de la conviction que chaque culture de la diaspora 
                a des histoires uniques à raconter. Nous créons un espace où ces voix 
                peuvent s'exprimer librement et toucher un public mondial.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                  <p><strong>Inclusivité</strong> - Nous célébrons toutes les cultures et identités</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0" />
                  <p><strong>Authenticité</strong> - Des histoires vraies racontées par leurs protagonistes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-podcast-accent rounded-full mt-3 flex-shrink-0" />
                  <p><strong>Dialogue</strong> - Créer des ponts entre les communautés</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button size="lg">
                    <span className="text-white font-semibold">En savoir plus</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            <Card className="overflow-hidden shadow-elegant">
              <div className="aspect-video bg-gradient-accent">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Équipe Bigg's Media"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Une Équipe Multiculturelle</h3>
                <p className="text-muted-foreground">
                  Notre équipe reflète la diversité que nous célébrons, 
                  avec des créateurs de contenu issus de différentes cultures 
                  et backgrounds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-podcast text-white shadow-glow max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Restez Connectés
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Recevez les derniers épisodes, les actualités de nos créateurs 
                et les événements de la communauté directement dans votre boîte mail.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-foreground border border-white/20 bg-white/10 backdrop-blur-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-6"
                >
                  <span className="text-primary font-semibold">
                    {loading ? 'Chargement...' : 'S\'abonner'}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
