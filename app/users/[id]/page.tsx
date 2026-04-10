"use client";

import { fetchPostByUserId } from "@/lib/api/posts";
import { useStore } from "@/lib/store/postStore";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/dist/client/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

const Page = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const { getPost, setPost } = useStore();
  const searchParams = useParams();
  const userId = searchParams.id;
  const navigate = useRouter();

  console.log(userId);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchPostByUserId(Number(userId));

      setPost([...getPost(), ...response.data]);
      console.log(response.data);
    }

    fetchPosts();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    const newPost: Post = {
      id: Date.now(),
      userId: Number(userId),
      title: formData.title,
      body: formData.body,
    };

    setPost([...getPost(), newPost]);
    setFormData({ title: "", body: "" });
    setShow(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="w-[80%] mx-auto py-5 text-black">
       
        {!show && (
          <div
            onClick={() => setShow(true)}
            className="w-full px-3 py-4 text-center bg-gray-200 my-5 rounded-2xl cursor-pointer"
          >
            + Add new post
          </div>
        )}

        {show && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border  my-5 rounded-lg p-4 bg-card"
          >
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Post title..."
                className="w-full border p-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                placeholder="Post body..."
                rows={4}
                className="w-full border p-3"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="border rounded-xl bg-green-400 text-white px-3 py-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="border rounded-xl bg-gray-400 text-white px-3 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="flex gap-3 flex-col">
          {getPost().length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            getPost().map((post) => (
              <div key={post.id} className="border px-3 py-4 rounded-xl">
                <h1 className="text-lg font-semibold ">{post.title}</h1>
                <p className="text-sm">{post.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
