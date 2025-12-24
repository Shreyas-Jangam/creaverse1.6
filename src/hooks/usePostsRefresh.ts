import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePosts } from './usePosts';
import { generateRefreshKey } from '@/utils/shufflePosts';
import { toast } from 'sonner';

export function usePostsRefresh() {
  const [refreshKey, setRefreshKey] = useState<string>();
  const queryClient = useQueryClient();
  
  const { data: posts, isLoading, error, isFetching } = usePosts(refreshKey);

  const refreshPosts = useCallback(async () => {
    try {
      // Generate a new refresh key to trigger re-fetch with shuffled posts
      const newRefreshKey = generateRefreshKey();
      setRefreshKey(newRefreshKey);
      
      // Invalidate the query to force a fresh fetch
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Show success message
      toast.success('Feed refreshed!', {
        description: 'Posts have been shuffled and updated',
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to refresh posts:', error);
      toast.error('Failed to refresh feed', {
        description: 'Please try again',
        duration: 3000,
      });
      throw error;
    }
  }, [queryClient]);

  return {
    posts,
    isLoading,
    error,
    isFetching,
    refreshPosts,
    isRefreshing: isFetching && !!refreshKey,
  };
}