import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Music as MusicIcon, 
  Play, 
  Star, 
  MessageSquare, 
  Upload,
  ListMusic,
  Headphones,
  Heart,
  Share2,
  Clock,
  User
} from "lucide-react";
import { AppLayout } from "@/components/layout";

// Mock music data
const musicTracks = [
  {
    id: 1,
    title: "Crypto Dreams",
    artist: "BlockchainBeats",
    genre: "Electronic",
    duration: "3:42",
    releaseDate: "2024-01-15",
    plays: 12500,
    likes: 892,
    description: "An uplifting electronic track exploring the future of decentralized finance through sound.",
    artwork: "🎵",
    tags: ["Electronic", "Crypto", "Upbeat"]
  },
  {
    id: 2,
    title: "Decentralized Love",
    artist: "Web3Harmony",
    genre: "Pop",
    duration: "4:18",
    releaseDate: "2024-01-20",
    plays: 8750,
    likes: 654,
    description: "A romantic pop ballad about finding connection in the digital age of Web3.",
    artwork: "💖",
    tags: ["Pop", "Romance", "Web3"]
  },
  {
    id: 3,
    title: "Mining the Beat",
    artist: "CryptoRhythm",
    genre: "Hip-Hop",
    duration: "3:28",
    releaseDate: "2024-01-12",
    plays: 15200,
    likes: 1123,
    description: "Hard-hitting hip-hop track with lyrics about cryptocurrency mining and blockchain technology.",
    artwork: "⛏️",
    tags: ["Hip-Hop", "Crypto", "Mining"]
  },
  {
    id: 4,
    title: "NFT Symphony",
    artist: "DigitalOrchestra",
    genre: "Classical",
    duration: "6:15",
    releaseDate: "2024-01-08",
    plays: 5430,
    likes: 432,
    description: "A classical symphony composed entirely using AI and minted as a unique NFT experience.",
    artwork: "🎼",
    tags: ["Classical", "NFT", "AI-Generated"]
  },
  {
    id: 5,
    title: "DAO Anthem",
    artist: "CommunityVoice",
    genre: "Rock",
    duration: "4:05",
    releaseDate: "2024-01-25",
    plays: 9870,
    likes: 743,
    description: "An energetic rock anthem celebrating decentralized autonomous organizations and community governance.",
    artwork: "🤘",
    tags: ["Rock", "DAO", "Community"]
  },
  {
    id: 6,
    title: "Smart Contract Blues",
    artist: "CodeMelody",
    genre: "Blues",
    duration: "5:22",
    releaseDate: "2024-01-18",
    plays: 6540,
    likes: 521,
    description: "Soulful blues track about the complexities and beauty of smart contract development.",
    artwork: "🎸",
    tags: ["Blues", "Smart Contracts", "Soulful"]
  }
];

export default function Music() {
  const [selectedTrack, setSelectedTrack] = useState<typeof musicTracks[0] | null>(null);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature will be available soon.`,
      duration: 3000,
    });
  };

  const handlePlayPreview = (trackId: number) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
      toast({
        title: "Preview Stopped",
        description: "Music preview stopped.",
        duration: 2000,
      });
    } else {
      setPlayingTrack(trackId);
      toast({
        title: "Playing Preview",
        description: "This would play a 30-second preview of the track.",
        duration: 3000,
      });
      // Auto-stop after 3 seconds for demo
      setTimeout(() => setPlayingTrack(null), 3000);
    }
  };

  const handleViewDetails = (track: typeof musicTracks[0]) => {
    setSelectedTrack(track);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton fallbackPath="/explore" />
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MusicIcon className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              🎵 Decentralized Music Experience
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fans discover artists, review songs, and engage in community-powered music.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
            onClick={() => showComingSoon("Upload Music")}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Music (Coming Soon)
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => showComingSoon("Create Playlist")}
          >
            <ListMusic className="w-5 h-5 mr-2" />
            Create Playlist (Coming Soon)
          </Button>
        </div>

        {/* Music Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicTracks.map((track) => (
            <Card key={track.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-purple-500/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                      {track.artwork}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                        {track.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{track.artist}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 w-fit">
                  Web3 Rewards Coming Soon
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Track Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {track.duration}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {track.genre}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Headphones className="w-4 h-4" />
                    <span>{formatNumber(track.plays)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{formatNumber(track.likes)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    variant={playingTrack === track.id ? "default" : "outline"}
                    size="sm" 
                    className="w-full"
                    onClick={() => handlePlayPreview(track.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {playingTrack === track.id ? "Playing Preview..." : "Play Preview"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewDetails(track)}
                  >
                    View Details
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Rate Song")}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Rate (Coming Soon)
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Write Review")}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Review (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Track Details Modal */}
        <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-400 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                  {selectedTrack?.artwork}
                </div>
                {selectedTrack?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedTrack && (
              <div className="space-y-6">
                {/* Artist Info */}
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-semibold">{selectedTrack.artist}</p>
                    <p className="text-sm text-muted-foreground">Artist</p>
                  </div>
                </div>

                {/* Track Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Genre</h4>
                    <Badge variant="outline">{selectedTrack.genre}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Duration</h4>
                    <p className="text-muted-foreground">{selectedTrack.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Release Date</h4>
                    <p className="text-muted-foreground">{selectedTrack.releaseDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Plays</h4>
                    <p className="text-muted-foreground">{selectedTrack.plays.toLocaleString()}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedTrack.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Headphones className="w-5 h-5 text-blue-500" />
                      <span className="text-2xl font-bold">{formatNumber(selectedTrack.plays)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Plays</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-2xl font-bold">{formatNumber(selectedTrack.likes)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrack.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                    onClick={() => handlePlayPreview(selectedTrack.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {playingTrack === selectedTrack.id ? "Playing Preview..." : "Play Preview"}
                  </Button>
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Rate Song")}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate (Coming Soon)
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Write Review")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Review (Coming Soon)
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Share Track")}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}