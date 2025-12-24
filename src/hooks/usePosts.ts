import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { shufflePostsWithDates } from "@/utils/shufflePosts";
import { mockPosts } from "@/data/mockData";

type MediaType = Database["public"]["Enums"]["media_type"];
type CreatorType = Database["public"]["Enums"]["creator_type"];

export interface CreatePostData {
  title: string;
  content: string;
  category: CreatorType;
  subcategory_id?: string;
  media_type: MediaType;
  media_url?: string;
  thumbnail_url?: string;
  tags: string[];
  is_tokenized: boolean;
  token_reward: number;
  is_published: boolean;
}

// Hook to fetch posts for the feed with public/private visibility support
export function usePosts(refreshKey?: string) {
  return useQuery({
    queryKey: ["posts", refreshKey],
    queryFn: async () => {
      console.log("🔍 Fetching posts from database...");
      
      try {
        // Check authentication status
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        const isAuthenticated = !!user && !authError;
        
        console.log("👤 Authentication status:", { 
          isAuthenticated, 
          userId: user?.id,
          authError: authError?.message 
        });

        // Test basic connection with a simple query that should always work
        const { data: testData, error: testError } = await supabase
          .from("posts")
          .select("count", { count: "exact", head: true })
          .eq("is_published", true)
          .limit(1);
        
        if (testError) {
          console.error("❌ Database connection test failed:", testError);
          // Don't throw immediately, try to continue with a fallback approach
        } else {
          console.log("✅ Database connection OK, published posts:", testData);
        }
        
        // Build the posts query - always fetch published posts
        // RLS policies should handle access control at the database level
        let postsQuery = supabase
          .from("posts")
          .select(`
            id,
            content,
            category,
            media_type,
            media_url,
            thumbnail_url,
            tags,
            is_tokenized,
            token_reward,
            likes_count,
            comments_count,
            shares_count,
            created_at,
            author_id,
            is_published
          `)
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(50);

        const { data, error } = await postsQuery;

        if (error) {
          console.error("❌ Posts query error:", error);
          console.error("❌ Full error details:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // If it's an RLS error, provide a more helpful message
          if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('RLS')) {
            console.log("🔒 RLS policy blocking access, this is expected for unauthenticated users");
            // Return empty array for now - this should be handled by proper RLS policies
            return [];
          }
          
          throw new Error(`Failed to fetch posts: ${error.message}`);
        }

        console.log("✅ Posts fetched:", data?.length || 0, "posts");

        // TEMPORARY: Always return mock posts to showcase creative communities
        // Remove this section when you want to use real database posts
        console.log("🎭 Returning sample posts for each creative community (overriding database posts)");
        
        // Use posts from mockData.ts which includes Shreyas Jangam's posts
        const allMockPosts = mockPosts.map(post => ({
          id: post.id,
          content: post.content,
          mediaType: post.mediaType,
          mediaUrl: post.mediaUrl,
          thumbnailUrl: post.thumbnailUrl,
          category: post.category,
          tags: post.tags,
          likes: post.likes,
          comments: post.comments,
          shares: post.shares,
          reviews: post.reviews || 0,
          saves: post.saves,
          tokenReward: post.tokenReward,
          isTokenized: post.isTokenized,
          createdAt: post.createdAt,
          isLiked: post.isLiked,
          isSaved: post.isSaved,
          author: post.author
        }));
        
        // Shuffle posts if this is a refresh (indicated by refreshKey)
        const finalPosts = refreshKey ? shufflePostsWithDates(allMockPosts) : allMockPosts;
        
        return finalPosts;

        // COMMENTED OUT: Original database post processing
        /*
        if (!data || data.length === 0) {
          console.log("📝 No published posts found in database");
          return [];
        }

        // COMMENTED OUT: Original database post processing
        /*
        // Get unique author IDs
        const authorIds = [...new Set(data.map(post => post.author_id))];
        console.log("👥 Fetching profiles for", authorIds.length, "authors");

        // Fetch author profiles - use public profiles view for public access
        const { data: profiles, error: profilesError } = await supabase
          .from("public_profiles")
          .select("id, username, display_name, avatar_url, is_verified")
          .in("id", authorIds);

        if (profilesError) {
          console.warn("⚠️ Profiles query error:", profilesError);
          console.warn("⚠️ Full profiles error details:", {
            message: profilesError.message,
            details: profilesError.details,
            hint: profilesError.hint,
            code: profilesError.code
          });
          // Continue without profiles - we'll use fallback data
          console.log("📝 Continuing with fallback profile data");
        }

        console.log("✅ Profiles fetched:", profiles?.length || 0, "profiles");

        // Create a map of profiles by ID
        const profilesMap = new Map(
          (profiles || []).map(profile => [profile.id, profile])
        );

        // Transform the data to match our Post interface
        const transformedPosts = data.map(post => {
          const profile = profilesMap.get(post.author_id);
          
          return {
            id: post.id,
            content: post.content,
            mediaType: post.media_type,
            mediaUrl: post.media_url,
            thumbnailUrl: post.thumbnail_url,
            category: post.category,
            tags: post.tags || [],
            likes: post.likes_count || 0,
            comments: post.comments_count || 0,
            shares: post.shares_count || 0,
            reviews: 0, // We'll need to calculate this separately if needed
            saves: 0, // We'll need to calculate this separately if needed
            tokenReward: post.token_reward || 0,
            isTokenized: post.is_tokenized || false,
            createdAt: new Date(post.created_at),
            isLiked: false, // We'll need to check user's likes separately
            isSaved: false, // We'll need to check user's saves separately
            author: {
              id: profile?.id || post.author_id,
              username: profile?.username || "creator",
              displayName: profile?.display_name || "Creative User",
              avatar: profile?.avatar_url,
              isVerified: profile?.is_verified || false,
              // Default values for required fields
              bio: "",
              role: "creator" as const,
              followers: 0,
              following: 0,
              tokensEarned: 0,
              tokensBalance: 0,
              reputation: 0,
              joinedAt: new Date(),
              categories: []
            }
          };
        });

        console.log("🎉 Transformed posts:", transformedPosts.length);
        return transformedPosts;
        */
      } catch (error) {
        console.error("💥 Posts fetch failed:", error);
        
        // Enhanced error handling with specific messages
        if (error instanceof Error) {
          if (error.message.includes('permission denied') || error.message.includes('RLS')) {
            console.log("🔒 Database access restricted - this may be expected for unauthenticated users");
            return []; // Return empty array instead of throwing
          }
          if (error.message.includes('network') || error.message.includes('fetch')) {
            throw new Error("Network connection failed. Please check your internet connection.");
          }
          if (error.message.includes('timeout')) {
            throw new Error("Request timed out. Please try again.");
          }
        }
        
        throw error;
      }
    },
    staleTime: 1000 * 60 * 2, // 2 minutes - shorter for more frequent updates
    gcTime: 1000 * 60 * 10, // 10 minutes - keep cached data longer
    refetchOnWindowFocus: true,
    refetchOnMount: false, // Don't refetch on mount if we have cached data
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      // Don't retry RLS/permission errors
      if (error instanceof Error && 
          (error.message.includes('permission denied') || 
           error.message.includes('RLS') ||
           error.message.includes('42501'))) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: CreatePostData) => {
      console.log("🚀 Creating post with data:", postData);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to create a post");
      }

      console.log("👤 User authenticated:", user.id);

      const insertData = {
        author_id: user.id,
        content: postData.content,
        category: postData.category,
        media_type: postData.media_type,
        media_url: postData.media_url,
        thumbnail_url: postData.thumbnail_url,
        tags: postData.tags,
        is_tokenized: postData.is_tokenized,
        token_reward: postData.token_reward,
        is_published: postData.is_published,
      };

      console.log("📝 Inserting post data:", insertData);

      const { data, error } = await supabase
        .from("posts")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("❌ Post creation error:", error);
        throw error;
      }

      console.log("✅ Post created successfully:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("🎉 Post creation success, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("💥 Post creation failed:", error);
    },
  });
}
