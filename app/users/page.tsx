"use client";

import { LoadingState } from "@/components/loading";
import UserCard from "@/components/UserCard";
import { fetchUsers } from "@/lib/api/users";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useRouter();

  async function fetchData() {
    const data = await fetchUsers();

    setAllUsers(data);
    setUsers(data);
  }

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();

      if (!query) {
        setUsers(allUsers);
        return;
      }

      const filtered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );

      setUsers(filtered);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, allUsers]);

  if (isLoading) {
    return <LoadingState message="Loading users....." />;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="w-[80%] mx-auto py-5 text-black">
        <h1
          className="font-bold text-3xl cursor-pointer"
          onClick={() => navigate.push("/")}
        >
          Dashboard
        </h1>

        <div className="w-full my-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border px-3 py-2 w-full rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-12 flex-wrap">
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              company={user.company.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
