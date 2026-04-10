
import { useRouter } from "next/navigation";
import React from "react";

type UserCardProps = {
  id:number;
  name: string;
  email: string;
  company: string;
  onViewPosts?: () => void;
};



export default function UserCard({
  id,
  name,
  email,
  company,
}: UserCardProps) {

  const router = useRouter();

  return (
    <div className="w-full p-4 border  rounded-xl shadow-sm bg-white flex flex-col gap-2">
      <h2 className="text-lg text-black font-bold">{name}</h2>

      <p className="text-sm text-gray-600">{email}</p>

      <p className="text-sm text-gray-500">
        Company: <span className="font-medium text-gray-800">{company}</span>
      </p>

      <button
        onClick={() => router.push(`/users/${id}`)}
        className="mt-3 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
      >
        View Posts
      </button>
    </div>
  );
}
