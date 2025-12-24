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
  Palette, 
  ArrowLeft, 
  Upload, 
  Coins, 
  Eye, 
  Star,
  ShoppingCart,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Heart,
  MessageSquare,
  Share2,
  Verified
} from "lucide-react";

// Mock NFT art data for placeholder UI
const mockArtworks = [
  {
    id: 1,
    title: "Quantum Dreams #001",
    artist: "CryptoArtist",
    artistVerified: true,
    description: "A mesmerizing digital artwork exploring the intersection of quantum physics and consciousness.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&auto=format",
    price: 2.5,
    currency: "ETH",
    likes: 847,
    views: 3421,
    comments: 23,
    rating: 4.8,
    blockchain: "Ethereum",
    royalty: 10,
    collection: "Quantum Series",
    isForSale: true,
    rarity: "Rare"
  },
  {
    id: 2,
    title: "Neon Genesis",
    artist: "DigitalVision",
    artistVerified: true,
    description: "Cyberpunk-inspired artwork featuring vibrant neon colors and futuristic cityscapes.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format",
    price: 1.8,
    currency: "ETH",
    likes: 1203,
    views: 5672,
    comments: 45,
    rating: 4.9,
    blockchain: "Polygon",
    royalty: 7.5,
    collection: "Cyberpunk Dreams",
    isForSale: true,
    rarity: "Epic"
  },
  {
    id: 3,
    title: "Abstract Emotions",
    artist: "ModernMuse",
    artistVerified: false,
    description: "An emotional journey through abstract forms and colors representing human feelings.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&auto=format",
    price: 0.75,
    currency: "ETH",
    likes: 456,
    views: 1834,
    comments: 12,
    rating: 4.6,
    blockchain: "Solana",
    royalty: 5,
    collection: "Emotional Abstracts",
    isForSale: true,
    rarity: "Common"
  },
  {
    id: 4,
    title: "Digital Renaissance",
    artist: "ClassicCrypto",
    artistVerified: true,
    description: "A modern interpretation of classical art techniques using digital mediums.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format",
    price: 4.2,
    currency: "ETH",
    likes: 2156,
    views: 8934,
    comments: 78,
    rating: 4.95,
    blockchain: "Ethereum",
    royalty: 12.5,
    collection: "Renaissance Reborn",
    isForSale: false,
    rarity: "Legendary"
  },
  {
    id: 5,
    title: "Fractal Universe",
    artist: "MathArtist",
    artistVerified: true,
    description: "Mathematical beauty expressed through intricate fractal patterns and cosmic themes.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop&auto=format",
    price: 1.5,
    currency: "ETH",
    likes: 789,
    views: 3245,
    comments: 34,
    rating: 4.7,
    blockchain: "Polygon",
    royalty: 8,
    collection: "Mathematical Art",
    isForSale: true,
    rarity: "Rare"
  },
  {
    id: 6,
    title: "Ethereal Landscapes",
    artist: "DreamWeaver",
    artistVerified: false,
    description: "Surreal landscapes that exist only in the digital realm, blending reality with imagination.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format&hue=120",
    price: 0.95,
    currency: "ETH",
    likes: 623,
    views: 2567,
    comments: 19,
    rating: 4.4,
    blockchain: "BSC",
    royalty: 6,
    collection: "Dream Worlds",
    isForSale: true,
    rarity: "Uncommon"
  }
];

const ArtworkCard = ({ artwork }: { artwork: typeof mockArtworks[0] }) => {
  const { toast } = useToast();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will be available with Web3 integration.`,
      duration: 3000,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Uncommon': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-purple-500/30 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Web3 Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
              Web3 Feature Coming Soon
            </Badge>
          </div>
          
          {/* Rarity Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={`text-xs ${getRarityColor(artwork.rarity)}`}>
              {artwork.rarity}
            </Badge>
          </div>
          
          {/* Price overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                <Coins className="w-3 h-3 text-yellow-400" />
                <span className="text-white font-bold text-sm">{artwork.price} {artwork.currency}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-white font-medium">{artwork.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
            {artwork.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">by {artwork.artist}</span>
            {artwork.artistVerified && (
              <Verified className="w-4 h-4 text-blue-400 fill-blue-400/20" />
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {artwork.collection}
            </Badge>
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
              {artwork.blockchain}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {artwork.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{artwork.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{artwork.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{artwork.comments}</span>
            </div>
          </div>
          <div className="text-xs text-purple-400">
            {artwork.royalty}% royalty
          </div>
        </div>
        
        <div className="space-y-2">
          {/* View Details Button */}
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="default" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white"
              >
                <Eye className="w-3 h-3 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{artwork.title} - NFT Details</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Artwork Image */}
                <div className="space-y-4">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => showComingSoon("Like Artwork")}
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      Like
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => showComingSoon("Share Artwork")}
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
                
                {/* Artwork Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-muted-foreground">Created by</span>
                      <span className="font-semibold">{artwork.artist}</span>
                      {artwork.artistVerified && (
                        <Verified className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {artwork.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-bold text-lg">{artwork.price} {artwork.currency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blockchain</p>
                      <p className="font-semibold">{artwork.blockchain}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Royalty</p>
                      <p className="font-semibold">{artwork.royalty}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rarity</p>
                      <Badge className={getRarityColor(artwork.rarity)}>
                        {artwork.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {artwork.isForSale ? (
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                        onClick={() => showComingSoon("Purchase NFT")}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now - {artwork.price} {artwork.currency}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Not For Sale
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => showComingSoon("Make Offer")}
                    >
                      Make Offer
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {artwork.isForSale ? (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs border-purple-500/30 hover:bg-purple-500/10"
                onClick={() => showComingSoon("Purchase NFT")}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy Now
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs"
                disabled
              >
                Not For Sale
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-xs hover:bg-purple-500/10"
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

export default function Art() {
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will be available with Web3 integration.`,
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="lg:py-6">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 border-b border-border">
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  🎨 Discover Digital Art NFTs
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                Mint NFT art collections with transparent royalties. Collectors discover and purchase unique digital art. 
                Community reviews earn CreovateDAO Tokens.
              </p>
              
              {/* Artist Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button 
                  variant="glow" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                  onClick={() => showComingSoon("Mint NFT Collection")}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Mint NFT Collection (Coming Soon)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 hover:bg-purple-500/10"
                  onClick={() => showComingSoon("Become Verified Artist")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Become Verified Artist (Coming Soon)
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
                  <Palette className="w-4 h-4 text-purple-500" />
                  <span className="text-xl font-bold">2.4K</span>
                </div>
                <p className="text-xs text-muted-foreground">NFT Artworks</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-xl font-bold">847</span>
                </div>
                <p className="text-xs text-muted-foreground">Verified Artists</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Coins className="w-4 h-4 text-purple-500" />
                  <span className="text-xl font-bold">892K</span>
                </div>
                <p className="text-xs text-muted-foreground">Total Volume (ETH)</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-purple-500" />
                  <span className="text-xl font-bold">4.8</span>
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
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Featured NFT Art Collections</h2>
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
                <Button variant="ghost" size="sm" className="text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Top Rated
                </Button>
              </div>
            </div>

            {/* Art Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Web3 NFT features launching soon! Join the digital art revolution on the blockchain.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}