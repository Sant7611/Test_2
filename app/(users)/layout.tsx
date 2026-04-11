"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
  return (
    <div className="bg-white w-full" >
      <div className=" w-[80%] mx-auto pt-5 " >
        <h1
          className="font-bold text-3xl cursor-pointer text-black"
          onClick={() => router.push("/users")}
        >
          Dashboard
        </h1>
      </div>
      {children}
    </div>
  );
};

export default Layout;