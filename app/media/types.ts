export interface MediaItem {
  id: string;
  title: string;
  coverUrl: string;
  whyILikeIt: string;
  rotation?: string;
  type: 'game' | 'movie' | 'series';
}

export interface MediaCategory {
  id: string;
  title: string;
  media: MediaItem[];
}
