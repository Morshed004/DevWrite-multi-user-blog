export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}


export interface UserSummary {
  id: string
  name: string;
  email: string;
  joinedAt: string;
  isAdmin: boolean;
  postCount: number;
}


export interface PostSummary {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  saveCount: number;
}