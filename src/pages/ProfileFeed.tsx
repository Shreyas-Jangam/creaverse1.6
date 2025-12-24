import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout";
import { BackButton } from "@/components/ui/back-button";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "@/components/post/PostCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProfileFeed() {
  const { username, postId } = useParams();
  const navigate = useNavigate();
  const { data: allPosts } = usePosts();
  
  // Filter posts by the profile user
  const profilePosts = allPosts?.filter(post => {
    if (username === "you") {
      return post.author.id === "current";
    }
    return post.author.username === username;
  }) || [];

  // Find the initial post index
  const initialIndex = profilePosts.findIndex(post => post.id === postId);
  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initialIndex));

  // Update current index when postId changes
  useEffect(() => {
    const newIndex = profilePosts.findIndex(post => post.id === postId);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  }, [postId, profilePosts]);

  // Get current post
  const currentPost = profilePosts[currentIndex];

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigate(`/profile/${username}/feed/${profilePosts[newIndex].id}`, { replace: true });
    }
  };

  const goToNext = () => {
    if (currentIndex < profilePosts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigate(`/profile/${username}/feed/${profilePosts[newIndex].id}`, { replace: true });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, profilePosts.length]);

  if (!currentPost) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto p-4">
          <BackButton fallbackPath={`/profile/${username}`} />
          <div className="text-center py-16">
            <p className="text-muted-foreground">Post not found</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const profileUser = currentPost.author;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton fallbackPath={`/profile/${username}`} />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {profileUser.avatar ? (
                    <img 
                      src={profileUser.avatar} 
                      alt={profileUser.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {profileUser.displayName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{profileUser.displayName}</p>
                  <p className="text-xs text-muted-foreground">@{profileUser.username}</p>
                </div>
              </div>
            </div>
            
            {/* Post counter */}
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {profilePosts.length}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg",
              "hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === profilePosts.length - 1}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg",
              "hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Post content */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPost.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={currentPost} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="h-8 px-3"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm text-muted-foreground px-2">
              {currentIndex + 1} / {profilePosts.length}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={currentIndex === profilePosts.length - 1}
              className="h-8 px-3"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Swipe indicators for mobile */}
        <div className="md:hidden text-center py-4">
          <p className="text-xs text-muted-foreground">
            Swipe left/right or use arrows to navigate
          </p>
        </div>
      </div>
    </AppLayout>
  );
}