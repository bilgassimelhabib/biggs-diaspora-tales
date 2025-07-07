import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, Share, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  duration?: string;
  onShare?: () => void;
  onDownload?: () => void;
  className?: string;
}

const AudioPlayer = ({ 
  title, 
  audioUrl, 
  duration = "00:00", 
  onShare, 
  onDownload,
  className = "" 
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * totalDuration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    const newVolume = value[0] / 100;
    
    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration ? (currentTime / totalDuration) * 100 : 0;

  return (
    <Card className={`p-4 bg-gradient-podcast shadow-podcast ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          size="lg"
          className="rounded-full h-12 w-12 p-0 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-glow"
          disabled={!audioUrl}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </Button>

        <div className="flex-1 min-w-0">
          {/* Track Info */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white line-clamp-1">{title}</h4>
            <div className="flex items-center space-x-2">
              {onShare && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onShare}
                  className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                >
                  <Share className="h-4 w-4" />
                </Button>
              )}
              {onDownload && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onDownload}
                  className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
              disabled={!audioUrl}
            />
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 min-w-0 w-24">
          <Volume2 className="h-4 w-4 text-white/80" />
          <Slider
            value={[volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;