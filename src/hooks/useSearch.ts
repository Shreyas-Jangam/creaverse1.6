import { useQuery } from "@tanstack/react-query";

export interface SearchResult {
  profiles: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string | null;
    bio: string | null;
    followers_count: number | null;
    creator_types: string[] | null;
    is_verified: boolean | null;
  }[];
  posts: {
    id: string;
    content: string;
    media_url: string | null;
    thumbnail_url: string | null;
    category: string;
    likes_count: number | null;
    comments_count: number | null;
    created_at: string | null;
    author_id: string;
  }[];
  tags: {
    tag: string;
    count: number;
  }[];
}

export function useSearch(query: string, activeTab: string = "all") {
  return useQuery({
    queryKey: ["search", query, activeTab],
    queryFn: async (): Promise<SearchResult> => {
      const searchTerm = query.trim().toLowerCase();
      
      if (!searchTerm) {
        return { profiles: [], posts: [], tags: [] };
      }

      // Import mock data dynamically to avoid circular dependencies
      const { mockUsers, mockPosts } = await import("@/data/mockData");

      const results: SearchResult = { profiles: [], posts: [], tags: [] };

      // Search profiles (creators)
      if (activeTab === "all" || activeTab === "creators") {
        const matchingProfiles = mockUsers
          .filter(user => 
            user.username.toLowerCase().includes(searchTerm) ||
            user.displayName.toLowerCase().includes(searchTerm) ||
            (user.bio && user.bio.toLowerCase().includes(searchTerm))
          )
          .map(user => ({
            id: user.id,
            username: user.username,
            display_name: user.displayName,
            avatar_url: user.avatar || null,
            bio: user.bio || null,
            followers_count: user.followers,
            creator_types: user.categories || [],
            is_verified: user.isVerified,
          }))
          .slice(0, 10);

        results.profiles = matchingProfiles;
      }

      // Search posts
      if (activeTab === "all" || activeTab === "posts") {
        const matchingPosts = mockPosts
          .filter(post => 
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
          )
          .map(post => ({
            id: post.id,
            content: post.content,
            media_url: post.mediaUrl || null,
            thumbnail_url: post.thumbnailUrl || null,
            category: post.category,
            likes_count: post.likes,
            comments_count: post.comments,
            created_at: post.createdAt.toISOString(),
            author_id: post.author.id,
          }))
          .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
          .slice(0, 20);

        results.posts = matchingPosts;
      }

      // Search by tags
      if (activeTab === "all" || activeTab === "tags") {
        const tagCounts: Record<string, number> = {};
        
        mockPosts.forEach((post) => {
          if (post.tags) {
            post.tags.forEach((tag: string) => {
              if (tag.toLowerCase().includes(searchTerm)) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
              }
            });
          }
        });

        results.tags = Object.entries(tagCounts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
      }

      return results;
    },
    enabled: query.trim().length > 0,
    staleTime: 30000, // Cache for 30 seconds
  });
}

// Fetch trending tags (most used from mock data)
export function useTrendingTags() {
  return useQuery({
    queryKey: ["trendingTags"],
    queryFn: async () => {
      // Import mock data dynamically to avoid circular dependencies
      const { mockPosts } = await import("@/data/mockData");

      // Count all tag occurrences from mock posts
      const tagCounts: Record<string, number> = {};
      mockPosts.forEach((post) => {
        if (post.tags) {
          post.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      return Object.entries(tagCounts)
        .map(([tag, posts]) => ({ tag, posts }))
        .sort((a, b) => b.posts - a.posts)
        .slice(0, 6);
    },
    staleTime: 60000, // Cache for 1 minute
  });
}

// Fetch suggested creators (mock creators with profiles)
export function useSuggestedCreators() {
  return useQuery({
    queryKey: ["suggestedCreators"],
    queryFn: async () => {
      // Import mock users dynamically to avoid circular dependencies
      const { mockUsers } = await import("@/data/mockData");
      
      // Filter to only include creators (exclude reviewers) and map to expected format
      const creators = mockUsers
        .filter(user => user.role === "creator")
        .map(user => ({
          id: user.id,
          username: user.username,
          display_name: user.displayName,
          avatar_url: user.avatar || null,
          followers_count: user.followers,
          creator_types: user.categories || [],
          is_verified: user.isVerified,
        }))
        .sort((a, b) => (b.followers_count || 0) - (a.followers_count || 0)); // Sort by followers descending
      
      return creators;
    },
    staleTime: 60000, // Cache for 1 minute
  });
}
