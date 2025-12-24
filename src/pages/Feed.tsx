import { AppLayout } from "@/components/layout";
import { MediaPostCard } from "@/components/media/MediaPostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { usePostsRefresh } from "@/hooks/usePostsRefresh";
import { MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnreadMessageCount } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { Post } from "@/types";

export default function Feed() {
  const { user } = useAuth();
  const { data: unreadCount = 0 } = useUnreadMessageCount();
  
  // Use the refresh-enabled posts hook
  const { 
    posts, 
    isLoading, 
    error, 
    isFetching, 
    refreshPosts, 
    isRefreshing 
  } = usePostsRefresh();
  
  // Cache for previously loaded posts to show during background loading
  const [cachedPosts, setCachedPosts] = useState<Post[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const hasPreviousData = useRef(false);

  // Debug logging
  console.log("🔍 Feed Debug:", {
    user: user?.id,
    postsCount: posts?.length,
    isLoading,
    error: error?.message,
    isFetching
  });

  // Update cached posts when new data arrives
  useEffect(() => {
    if (posts && posts.length > 0) {
      setCachedPosts(posts);
      hasPreviousData.current = true;
      
      // Mark initial load as complete once we have data
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  }, [posts, isInitialLoad]);

  // Use real posts or cached posts during loading
  const postsToDisplay = (() => {
    // Use current posts if available
    if (posts && posts.length > 0) {
      return posts;
    }
    
    // If we're loading and have cached posts, show cached posts
    if (isLoading && cachedPosts.length > 0) {
      return cachedPosts;
    }
    
    // Otherwise return null/empty
    return null;
  })();

  // Determine loading state for UI
  const showInitialLoader = isInitialLoad && isLoading && !hasPreviousData.current;

  return (
    <AppLayout>
      <PullToRefresh onRefresh={refreshPosts} className="lg:py-6 overflow-x-hidden">
        {/* Ultra-Responsive Feed Header - Enhanced Mobile-First Design */}
        <div className="bg-card border-b border-border sticky top-0 z-40 header-responsive">
          <div className="w-full px-3 xs:px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center justify-between gap-1 xs:gap-2 min-h-[44px] max-w-full">
              {/* Left: Ultra-Adaptive Title Section */}
              <div className="flex-1 min-w-0 pr-1 xs:pr-2">
                <h1 className="font-bold text-foreground leading-tight truncate">
                  {/* Ultra-small screens (280px-320px): Minimal */}
                  <span className="block 2xs:hidden text-sm">
                    Feed
                  </span>
                  {/* Small screens (320px-375px): Short */}
                  <span className="hidden 2xs:block xs:hidden text-base">
                    Discover
                  </span>
                  {/* Standard mobile (375px-480px): Medium */}
                  <span className="hidden xs:block sm:hidden text-lg">
                    Creative Feed
                  </span>
                  {/* Large mobile (480px-640px): Extended */}
                  <span className="hidden sm:block md:hidden text-xl">
                    Discover Creative
                  </span>
                  {/* Tablet+ (640px+): Full title */}
                  <span className="hidden md:block text-xl lg:text-2xl xl:text-3xl">
                    Discover Creative Content
                  </span>
                </h1>
                {/* Contextual subtitle - only on larger screens */}
                <p className="hidden lg:block text-xs text-muted-foreground mt-0.5 leading-tight opacity-80 truncate">
                  Explore amazing content from our creative community
                </p>
              </div>
              
              {/* Right: Ultra-Compact Action Buttons */}
              <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0">
                {user ? (
                  <>
                    {/* Messages Button - Ultra Responsive */}
                    <Link to="/messages">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="relative h-8 xs:h-9 px-2 xs:px-3 sm:px-4 rounded-full border-border/50 hover:border-border transition-all duration-200 text-xs xs:text-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                        {/* Progressive text reveal */}
                        <span className="hidden xs:inline ml-1 xs:ml-1.5">
                          <span className="xs:hidden sm:inline">Messages</span>
                          <span className="hidden xs:inline sm:hidden">Msg</span>
                        </span>
                        {unreadCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 h-3 xs:h-4 min-w-[12px] xs:min-w-[16px] flex items-center justify-center p-0 text-[9px] xs:text-[10px] font-medium"
                          >
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    
                    {/* User Profile Button - Compact */}
                    <Link to="/profile">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 xs:h-9 xs:w-9 rounded-full p-0 hover:bg-accent flex-shrink-0 transition-all duration-200"
                      >
                        <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-[10px] xs:text-xs font-semibold">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </Button>
                    </Link>

                    {/* Refresh Button - Adaptive visibility */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshPosts}
                      disabled={isRefreshing}
                      className="hidden xs:flex h-8 xs:h-9 px-2 xs:px-3 rounded-full transition-all duration-200 text-xs xs:text-sm"
                    >
                      <Loader2 className={`w-3.5 h-3.5 xs:w-4 xs:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="ml-1 xs:ml-1.5 hidden sm:inline">
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                      </span>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Messages Button for Guest - Compact */}
                    <Link to="/messages">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 xs:h-9 px-2 xs:px-3 sm:px-4 rounded-full border-border/50 hover:border-border transition-all duration-200 text-xs xs:text-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                        <span className="hidden xs:inline ml-1 xs:ml-1.5">
                          <span className="xs:hidden sm:inline">Messages</span>
                          <span className="hidden xs:inline sm:hidden">Msg</span>
                        </span>
                      </Button>
                    </Link>
                    
                    {/* Live Soon Badge - Ultra Responsive */}
                    <Link to="/auth">
                      <div className="flex items-center gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4 h-8 xs:h-9 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer flex-shrink-0">
                        <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-cyan-100">
                          <span className="2xs:hidden">Soon</span>
                          <span className="hidden 2xs:inline xs:hidden">Live</span>
                          <span className="hidden xs:inline">Live Soon</span>
                        </span>
                      </div>
                    </Link>

                    {/* Refresh Button for Guest - Adaptive */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshPosts}
                      disabled={isRefreshing}
                      className="hidden xs:flex h-8 xs:h-9 px-2 xs:px-3 rounded-full transition-all duration-200 text-xs xs:text-sm"
                    >
                      <Loader2 className={`w-3.5 h-3.5 xs:w-4 xs:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="ml-1 xs:ml-1.5 hidden sm:inline">
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                      </span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Initial Loading State - only show when no cached data */}
        {showInitialLoader && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading your feed...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !postsToDisplay?.length && !showInitialLoader && (
          <Card className="m-4 border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
              <h3 className="font-semibold text-destructive mb-2">
                {user ? "Failed to load feed" : "Unable to load content"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {user 
                  ? (error instanceof Error ? error.message : "Something went wrong")
                  : "We're having trouble loading the public feed. This might be a temporary issue."
                }
              </p>
              <div className="flex gap-2 justify-center">
                {!user && (
                  <Link to="/auth">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-sm font-medium text-cyan-100">Authentication Live Soon</span>
                    </div>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State - only show when no posts and not loading */}
        {!showInitialLoader && !error && (!postsToDisplay || postsToDisplay.length === 0) && (
          <Card className="m-4">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">
                {user ? "No posts yet" : "Welcome to Creaverse"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {user 
                  ? "Be the first to share something amazing with the community!"
                  : "Discover amazing creative content from our community. Authentication is coming soon - for now, explore as a guest!"
                }
              </p>
              {user ? (
                <Link to="/create">
                  <Button>Create Your First Post</Button>
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Link to="/auth">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-sm font-medium text-cyan-100">Authentication Live Soon</span>
                    </div>
                  </Link>
                  <Link to="/create">
                    <Button variant="outline">Browse as Guest</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Feed - show posts even during background loading */}
        {!showInitialLoader && postsToDisplay && postsToDisplay.length > 0 && (
          <>
            {/* Posts - Always Instagram Style */}
            <div className="space-y-6 w-full max-w-lg mx-auto px-4 overflow-x-hidden">
              {postsToDisplay.map((post: Post) => (
                <MediaPostCard 
                  key={post.id} 
                  post={post} 
                  autoPlay={true}
                  showFullControls={true}
                />
              ))}
            </div>

            {/* Clean Footer */}
            <div className="p-6 text-center">
              <div className="text-xs text-muted-foreground">
                You've reached the end of your feed
              </div>
            </div>
          </>
        )}
      </PullToRefresh>
    </AppLayout>
  );
}
