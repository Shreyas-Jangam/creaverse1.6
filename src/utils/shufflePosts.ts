import { Post } from "@/types";

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle posts and update their created dates to maintain chronological appearance
export function shufflePostsWithDates(posts: Post[]): Post[] {
  const shuffled = shuffleArray(posts);
  
  // Update created dates to maintain chronological order after shuffle
  return shuffled.map((post, index) => ({
    ...post,
    createdAt: new Date(Date.now() - (index * 2 * 60 * 60 * 1000)), // 2 hours apart
  }));
}

// Generate a random refresh key to force re-render
export function generateRefreshKey(): string {
  return `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}