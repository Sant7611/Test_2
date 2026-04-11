import { create } from "zustand";
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Store = {
  posts: Post[];
  setPost: (post: Post[]) => void;
  getPost: () => Post[];
};

export const useStore = create<Store>((set, get) => ({
  posts: [],
  setPost: (post: Post[]) =>
    set(() => ({ posts: post })),
  getPost: () => get().posts,
}));
