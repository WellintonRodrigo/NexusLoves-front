export interface Comment {
  id: number;
  content: string;
}

export interface Reaction {
  id: number;
  reactionType: string;
}

export interface VibePost {
  id: number;
  title: string;
  content: string;
  author: string;
  comments: Comment[];
  reactions: Reaction[];
}