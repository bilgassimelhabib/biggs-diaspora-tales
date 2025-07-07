import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Share, Download } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  duration: string;
  date: string;
  audioUrl: string;
}

interface PodcastCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  episodeCount: number;
  latestEpisode?: Episode;
  className?: string;
}

const PodcastCard = ({
  id,
  title,
  description,
  coverImage,
  category,
  episodeCount,
  latestEpisode,
  className = ""
}: PodcastCardProps) => {
  return (
    <Card className={`group hover:shadow-podcast transition-all duration-300 overflow-hidden ${className}`}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-primary font-medium">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-black/50 border-white/30 text-white">
            {episodeCount} épisodes
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
              {latestEpisode && (
                <p className="text-xs text-white/80">
                  Dernier épisode: {latestEpisode.date}
                </p>
              )}
            </div>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary-hover text-white rounded-full h-10 w-10 p-0 shadow-glow transition-all duration-300 hover:scale-110"
            >
              <Play className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        {latestEpisode && (
          <div className="border-t pt-3 mb-4">
            <h4 className="font-medium text-sm mb-2">Dernier épisode:</h4>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{latestEpisode.title}</p>
                <p className="text-xs text-muted-foreground">{latestEpisode.duration} • {latestEpisode.date}</p>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <Link to={`/podcast/${id}`}>
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            Découvrir le podcast
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;