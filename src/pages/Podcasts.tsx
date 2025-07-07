import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import PodcastCard from "@/components/PodcastCard";

// Mock data étendu pour les podcasts
const allPodcasts = [
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
  },
  {
    id: "4",
    title: "Migrations Contemporaines",
    description: "Explorez les défis et opportunités des nouvelles générations d'immigrants et leur impact sur les sociétés d'accueil.",
    coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Société",
    episodeCount: 6,
    latestEpisode: {
      id: "4",
      title: "Intégration professionnelle : parcours de réussite",
      duration: "42:18",
      date: "8 Nov 2024",
      audioUrl: ""
    }
  },
  {
    id: "5",
    title: "Langues Maternelles",
    description: "Comment les langues d'origine se transmettent-elles et évoluent-elles au sein des communautés diasporiques ?",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Linguistique",
    episodeCount: 10,
    latestEpisode: {
      id: "5",
      title: "Le multilinguisme comme atout",
      duration: "37:45",
      date: "5 Nov 2024",
      audioUrl: ""
    }
  },
  {
    id: "6",
    title: "Cuisines du Monde",
    description: "Un voyage gustatif à travers les traditions culinaires préservées et réinventées par les communautés diasporiques.",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Gastronomie",
    episodeCount: 9,
    latestEpisode: {
      id: "6",
      title: "Fusion culinaire : tradition et innovation",
      duration: "40:12",
      date: "3 Nov 2024",
      audioUrl: ""
    }
  }
];

const categories = ["Tous", "Culture", "Musique", "Histoire", "Société", "Linguistique", "Gastronomie"];

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");

  const filteredPodcasts = allPodcasts
    .filter(podcast => {
      const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Tous" || podcast.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "episodes":
          return b.episodeCount - a.episodeCount;
        case "recent":
        default:
          return new Date(b.latestEpisode?.date || "").getTime() - new Date(a.latestEpisode?.date || "").getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            🎙️ Nos Podcasts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Découvrez Nos Podcasts
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Explorez notre collection de podcasts multiculturels dédiés aux histoires 
            et expériences des communautés de la diaspora mondiale.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un podcast..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="title">Titre A-Z</SelectItem>
                <SelectItem value="episodes">Nombre d'épisodes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredPodcasts.length} podcast{filteredPodcasts.length > 1 ? 's' : ''} trouvé{filteredPodcasts.length > 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Podcasts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredPodcasts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} {...podcast} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Aucun podcast trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos critères de recherche ou explorez toutes nos catégories.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Tous");
                  }}
                  variant="outline"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explorez par Catégorie</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos différentes thématiques et trouvez les podcasts qui vous correspondent.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const count = allPodcasts.filter(p => p.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-podcast transition-all duration-300"
                >
                  <span className="font-medium">{category}</span>
                  <Badge variant="secondary" className="text-xs">
                    {count} podcast{count > 1 ? 's' : ''}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcasts;