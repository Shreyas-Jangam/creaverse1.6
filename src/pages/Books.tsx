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
  BookOpen, 
  ArrowLeft, 
  Upload, 
  Coins, 
  Eye, 
  Star,
  Lock,
  Sparkles,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";

// Mock book data for placeholder UI
const mockBooks = [
  {
    id: 1,
    title: "Decentralized Dreams",
    author: "Alex Chen",
    description: "A thrilling journey through the world of blockchain technology and its impact on society.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format",
    chapters: 12,
    stakersCount: 1247,
    rating: 4.8,
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "Smart Contract Chronicles",
    author: "Sarah Johnson",
    description: "Learn the fundamentals of smart contracts through engaging storytelling and real-world examples.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format",
    chapters: 8,
    stakersCount: 892,
    rating: 4.6,
    genre: "Educational"
  },
  {
    id: 3,
    title: "The Token Economy",
    author: "Michael Rodriguez",
    description: "Exploring the future of digital economies and how tokens are reshaping value exchange.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format",
    chapters: 15,
    stakersCount: 2156,
    rating: 4.9,
    genre: "Economics"
  },
  {
    id: 4,
    title: "Web3 Mysteries",
    author: "Emma Thompson",
    description: "A detective story set in a world where blockchain technology solves crimes and mysteries.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&auto=format",
    chapters: 20,
    stakersCount: 1834,
    rating: 4.7,
    genre: "Mystery"
  },
  {
    id: 5,
    title: "DeFi Adventures",
    author: "David Kim",
    description: "Navigate the complex world of decentralized finance through interactive storytelling.",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop&auto=format",
    chapters: 10,
    stakersCount: 967,
    rating: 4.5,
    genre: "Adventure"
  }
];

const BookCard = ({ book }: { book: typeof mockBooks[0] }) => {
  const { toast } = useToast();
  const [previewOpen, setPreviewOpen] = useState(false);

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will be available soon. Stay tuned!`,
      duration: 3000,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              Web3 Feature Coming Soon
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-white font-medium">{book.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{book.chapters} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{book.stakersCount.toLocaleString()} stakers</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs"
              onClick={() => showComingSoon("Stake Tokens to Unlock")}
            >
              <Lock className="w-3 h-3 mr-1" />
              Stake Tokens to Unlock
            </Button>
            
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{book.title} - Preview</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Chapter 1: The Beginning</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In the year 2030, the world had changed dramatically. Blockchain technology wasn't just 
                      a buzzword anymore—it was the foundation of society. Every transaction, every contract, 
                      every piece of digital art was secured by cryptographic proof and distributed across 
                      thousands of nodes worldwide.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      Sarah walked through the neon-lit streets of Neo Tokyo, her digital wallet automatically 
                      negotiating micro-payments for every step she took on the smart sidewalks. The city 
                      itself was a living, breathing smart contract...
                    </p>
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        📚 This is just a preview. Stake tokens to unlock the full chapter and support the author!
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-full text-xs"
            onClick={() => showComingSoon("Write Review")}
          >
            <Star className="w-3 h-3 mr-1" />
            Write Review – Coming Soon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Books() {
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `${feature} feature will be available soon. Stay tuned for Web3 book features!`,
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="lg:py-6">
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 border-b border-border">
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Discover Web3 Books
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Indie authors tokenize chapters. Readers stake tokens to unlock content. 
                Meaningful reviews earn rewards.
              </p>
              
              {/* Author Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <Button 
                  variant="glow" 
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400"
                  onClick={() => showComingSoon("Tokenize Chapter")}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Tokenize Chapter (Coming Soon)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-amber-500/30 hover:bg-amber-500/10"
                  onClick={() => showComingSoon("Upload Book")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Book (Coming Soon)
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
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span className="text-xl font-bold">127</span>
                </div>
                <p className="text-xs text-muted-foreground">Books Available</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span className="text-xl font-bold">2.4K</span>
                </div>
                <p className="text-xs text-muted-foreground">Active Readers</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span className="text-xl font-bold">45K</span>
                </div>
                <p className="text-xs text-muted-foreground">Tokens Staked</p>
              </div>
              
              <div className="text-center p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-xl font-bold">4.7</span>
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
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-semibold">Featured Web3 Books</h2>
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

            {/* Book Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Web3 features launching soon! Join our community to get early access.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}