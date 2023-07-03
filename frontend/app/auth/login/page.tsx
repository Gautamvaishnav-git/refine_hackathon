"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Login from "../components/login";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const login = async () => {
    const { data, error } = await toast.promise(
      supabase.auth.signInWithPassword({
        email: "gauravvaishnav8690@gmail.com",
        password: "this is my password",
      }),
      {
        pending: "You are logging in...",
      }
    );
    if (error) {
      if (error?.message === "Invalid login credentials") {
        toast.error("Invalid login credentials!");
      } else if (error?.message === "Failed to fetch") {
        toast.error("Failed to fetch! please check network connection.");
      }
    } else {
      router.refresh();
    }
  };

  return (
    <>
      <Login login={login} />
    </>
  );
};

export default Page;
