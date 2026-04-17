export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  whyILikeIt: string;
  rotation?: string;
}

export interface Category {
  id: string;
  title: string;
  games: Game[];
}
