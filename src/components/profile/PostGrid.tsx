import { useState } from "react";
import { Post } from "@/types";
import { 
  Heart, 
  MessageCircle, 
  Play, 
  Coins, 
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PostGridProps {
  posts: Post[];
  emptyState: { title: string; description: string };
  isOwnProfile: boolean;
  showNftBadge?: boolean;
  username: string; // Add username prop for navigation
}

export function PostGrid({ posts, emptyState, isOwnProfile, showNftBadge = true, username }: PostGridProps) {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showHeart, setShowHeart] = useState<string | null>(null);
  const handleDoubleTap = (post: Post) => {
    if (!likedPosts.has(post.id)) {
      setLikedPosts(prev => new Set([...prev, post.id]));
      setShowHeart(post.id);
      setTimeout(() => setShowHeart(null), 1000);
    }
  };

  const handlePostClick = (post: Post) => {
    navigate(`/profile/${username}/feed/${post.id}`);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{emptyState.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{emptyState.description}</p>
        {isOwnProfile && emptyState.title.includes("Posts") && (
          <Link to="/create">
            <Button variant="glow">Create First Post</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 md:gap-1">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative aspect-square overflow-hidden group cursor-pointer bg-muted"
            onClick={() => handlePostClick(post)}
            onDoubleClick={() => handleDoubleTap(post)}
          >
            {/* Image/Video */}
            <img 
              src={post.thumbnailUrl || post.mediaUrl} 
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Media Type Indicator */}
            {post.mediaType === "video" && (
              <div className="absolute top-2 right-2">
                <Play className="w-5 h-5 text-white drop-shadow-lg fill-white" />
              </div>
            )}

            {/* NFT Badge */}
            {showNftBadge && post.isTokenized && (
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-primary/80 text-primary-foreground text-[10px] px-1.5 py-0.5">
                  <Coins className="w-3 h-3 mr-0.5" />
                  NFT
                </Badge>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Heart className={cn("w-5 h-5", likedPosts.has(post.id) && "fill-white")} />
                  <span>{formatNumber(post.likes + (likedPosts.has(post.id) ? 1 : 0))}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <MessageCircle className="w-5 h-5" />
                  <span>{formatNumber(post.comments)}</span>
                </div>
              </div>
            </div>

            {/* Heart Animation on Double Tap */}
            <AnimatePresence>
              {showHeart === post.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Heart className="w-20 h-20 text-white fill-white drop-shadow-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </>
  );
}
