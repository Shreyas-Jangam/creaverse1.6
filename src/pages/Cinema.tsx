import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Film, 
  ArrowLeft, 
  Upload, 
  Coins, 
  Play, 
  Star,
  Lock,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Eye,
  Calendar,
  Award
} from "lucide-react";

// Mock film data for placeholder UI
const mockFilms = [
  {
    id: 1,
    title: "Blockchain Noir",
    creator: "Maya Rodriguez",
    tagline: "A detective story set in a world where every transaction tells a tale.",
    posterImage: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop&auto=format",
    duration: "2h 15m",
    genre: "Thriller",
    rating: 4.8,
    viewersCount: 2847,
    releaseYear: 2024,
    earlyAccessPrice: 50
  },
  {
    id: 2,
    title: "The Token Wars",
    creator: "Alex Chen",
    tagline: "An epic saga of digital empires fighting for control of the metaverse.",
    posterImage: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop&auto=format",
    duration: "2h 45m",
    genre: "Sci-Fi",
    rating: 4.9,
    viewersCount: 4521,
    releaseYear: 2024,
    earlyAccessPrice: 75
  },
  {
    id: 3,
    title: "Smart Contract",
    creator: "Jordan Kim",
    tagline: "A romantic comedy about two developers who fall in love through code.",
    posterImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&auto=format",
    duration: "1h 52m",
    genre: "Romance",
    rating: 4.6,
    viewersCount: 1923,
    releaseYear: 2024,
    earlyAccessPrice: 40
  },
  {
    id: 4,
    title: "Decentralized Dreams",
    creator: "Sarah Johnson",
    tagline: "A documentary exploring the human stories behind the blockchain revolution.",
    posterImage: "https://images.unsplash.com/photo-1478720568477-b0ac8ace8a5a?w=400&h=600&fit=crop&auto=format",
    duration: "1h 38m",
    genre: "Documentary",
    rating: 4.7,
    viewersCount: 3156,
    releaseYear: 2024,
    earlyAccessPrice: 30
  },
  {
    id: 5,
    title: "The Mining Conspiracy",
    creator: "David Park",
    tagline: "An action thriller about a group trying to expose a massive crypto conspiracy.",
    posterImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop&auto=format",
    duration: "2h 8m",
    genre: "Action",
    rating: 4.5,
    viewersCount: 2734,
    releaseYear: 2024,
    earlyAccessPrice: 60
  },
  {
    id: 6,
    title: "Web3 Wonderland",
    creator: "Emma Thompson",
    tagline: "A whimsical adventure through the colorful world of NFTs and digital art.",
    posterImage: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop&auto=format&sat=-100&hue=240",
    duration: "1h 45m",
    genre: "Adventure",
    rating: 4.4,
    viewersCount: 1687,
    releaseYear: 2024,
    earlyAccessPrice: 45
  }
];

const FilmCard = ({ film }: { film: typeof mockFilms[0] }) => {
  const { toast } = useToast();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will launch with Web3 integration.`,
      duration: 3000,
    });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-red-500/30 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={film.posterImage} 
            alt={film.title}
            className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Web3 Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
              Web3 Feature Coming Soon
            </Badge>
          </div>
          
          {/* Rating */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-white font-medium">{film.rating}</span>
          </div>
          
          {/* Film info overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
              <Calendar className="w-3 h-3" />
              <span>{film.releaseYear}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{film.duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 group-hover:text-red-400 transition-colors line-clamp-1">
            {film.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">by {film.creator}</p>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {film.genre}
            </Badge>
            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
              {film.earlyAccessPrice} CDT
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {film.tagline}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{film.viewersCount.toLocaleString()} viewers</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>Early Access</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {/* Watch Trailer Button */}
          <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="default" 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white"
              >
                <Play className="w-3 h-3 mr-2" />
                Watch Trailer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{film.title} - Official Trailer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Placeholder video area */}
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={film.posterImage} 
                    alt={film.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm border border-red-500/30">
                      <Play className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-white font-medium mb-1">Trailer Preview</p>
                    <p className="text-white/70 text-sm">
                      Experience the cinematic journey of {film.title}
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">About This Film</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {film.tagline} This groundbreaking {film.genre.toLowerCase()} film explores themes of 
                    technology, humanity, and the future of digital society through compelling storytelling 
                    and stunning visuals.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Duration: {film.duration}</span>
                    <span>Genre: {film.genre}</span>
                    <span>Rating: {film.rating}/5</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs border-red-500/30 hover:bg-red-500/10"
              onClick={() => showComingSoon("Early Access – Stake Tokens")}
            >
              <Lock className="w-3 h-3 mr-1" />
              Early Access
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-xs hover:bg-red-500/10"
              onClick={() => showComingSoon("Write Review")}
            >
              <Star className="w-3 h-3 mr-1" />
              Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Cinema() {
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will launch with Web3 integration.`,
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="lg:py-6">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-red-500/10 via-orange-500/5 to-yellow-500/10 border-b border-border">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <BackButton 
              variant="ghost" 
              className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
              fallbackPath="/explore"
            >
              <span className="sr-only">Back</span>
            </BackButton>
          </div>

          <div className="relative p-6 md:p-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  🎬 Discover Decentralized Cinema
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                Films tokenized with transparent royalty splits. Early viewers leave detailed reviews 
                and earn CreovateDAO Tokens.
              </p>
              
              {/* Producer/Filmmaker Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button 
                  variant="glow" 
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400"
                  onClick={() => showComingSoon("Tokenize Film")}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Tokenize Film (Coming Soon)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-red-500/30 hover:bg-red-500/10"
                  onClick={() => showComingSoon("Upload / Register Film")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload / Register Film (Coming Soon)
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Film className="w-4 h-4 text-red-500" />
                  <span className="text-xl font-bold">89</span>
                </div>
                <p className="text-xs text-muted-foreground">Films Available</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-red-500" />
                  <span className="text-xl font-bold">12.8K</span>
                </div>
                <p className="text-xs text-muted-foreground">Active Viewers</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Coins className="w-4 h-4 text-red-500" />
                  <span className="text-xl font-bold">156K</span>
                </div>
                <p className="text-xs text-muted-foreground">Tokens Staked</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-red-500" />
                  <span className="text-xl font-bold">4.6</span>
                </div>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-semibold">Featured Web3 Films</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Recent
                </Button>
              </div>
            </div>

            {/* Film Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockFilms.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Web3 cinema features launching soon! Be among the first to experience decentralized filmmaking.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}