"use client";

import { fetchPostByUserId } from "@/lib/api/posts";
import { FormData, formSchema } from "@/lib/schemas/formSchema";
import { useStore } from "@/lib/store/postStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Post = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

const Page = () => {
  const [show, setShow] = useState(false);
  // const [formData, setFormData] = useState({ title: "", body: "" });
  const { getPost, setPost } = useStore();
  const searchParams = useParams();
  const userId = Number(searchParams.id);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchPostByUserId(userId);

      setPost([...getPost(), ...response.data]);
    }

    fetchPosts();
  }, []);

  function onSubmit(data: FormData) {
    const newPost: Post = {
      id: Date.now(),
      userId: Number(userId),
      title: data.title,
      body: data.body,
    };

    setPost([...getPost(), newPost]);
    setShow(false);
    reset();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

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
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 border  my-5 rounded-lg p-4 bg-card"
          >
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                {...register("title")}
                placeholder="Post title..."
                className="w-full border p-3"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                {...register("body")}
                placeholder="Post body..."
                rows={4}
                className="w-full border p-3"
              />
              {errors.body && (
                <p className="text-red-500">{errors.body.message}</p>
              )}
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
            getPost().map((post, index) => (
              <div key={index} className="border px-3 py-4 rounded-xl">
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
