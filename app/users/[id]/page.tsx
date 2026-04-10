"use client";

import React, { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

const Page = () => {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({ title: "", body: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    const newPost: Post = {
      id: Date.now(),
      title: formData.title,
      body: formData.body,
    };

    setPosts((prev) => [...prev, newPost]);
    setFormData({ title: "", body: "" });
    setShow(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="w-[80%] mx-auto py-5 text-black">
        <h1 className="font-bold text-3xl bg-white text-black">Dashboard</h1>
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
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border px-3 py-4 rounded-xl">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
