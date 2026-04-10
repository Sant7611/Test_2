import { CreatePostInput, Post } from "../types";
import { api } from "./client";

export async function fetchPostByUserId(userId: number) {
    const data = await api.get<Post[]>(`/posts?userId=${userId}`)
    return data
}

export async function createPost(PostInput:CreatePostInput){
    const data = await api.post<Post>("/posts",PostInput);
    return data;
}