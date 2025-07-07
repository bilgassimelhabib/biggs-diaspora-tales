
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Users, Mic } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Inclusion",
      description: "Nous célébrons toutes les voix et créons un espace sûr pour chaque communauté de la diaspora."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Diversité",
      description: "Nos contenus reflètent la richesse culturelle de nos communautés à travers le monde."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Communauté",
      description: "Nous construisons des ponts entre les cultures et favorisons le dialogue interculturel."
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Authenticité",
      description: "Chaque histoire que nous racontons est vraie, respectueuse et portée par ceux qui la vivent."
    }
  ];

  const team = [
    {
      name: "Équipe Éditoriale",
      role: "Création de contenu",
      description: "Une équipe passionnée dédiée à la production de contenus authentiques et engageants."
    },
    {
      name: "Équipe Technique",
      role: "Innovation digitale",
      description: "Développement de solutions créatives pour connecter nos communautés."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              À propos de nous
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Notre Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Valoriser les voix de la diaspora mondiale et promouvoir le dialogue interculturel à travers des contenus authentiques et engageants.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Bigg's Media, c'est quoi ?
            </h2>
            <div className="prose prose-lg max-w-none text-center text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Bigg's Media est né d'une conviction simple : les histoires de la diaspora méritent d'être entendues, célébrées et partagées. Nous créons un espace où chaque voix trouve sa place, où chaque culture est respectée, et où le dialogue interculturel devient une source d'enrichissement mutuel.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                À travers nos podcasts, nous explorons les réalités, les défis et les succès des communautés diasporiques. Nous racontons des histoires qui inspirent, éduquent et connectent les gens au-delà des frontières géographiques et culturelles.
              </p>
              <p className="text-lg leading-relaxed">
                Notre plateforme est un pont entre les cultures, un lieu de rencontre virtuel où la diversité devient une force créatrice de liens authentiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-podcast transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Notre Équipe
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-podcast">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Découvrez nos podcasts et faites partie de cette aventure multiculturelle unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/podcasts">Découvrir nos Podcasts</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="/contact">Nous Contacter</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
