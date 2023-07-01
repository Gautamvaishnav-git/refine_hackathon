"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "gauravvaishnav8690@gmail.com",
      password: "this is my password",
    });
    console.log(data);
    if (error?.message === "Invalid login credentials") {
      alert("Invalid login credentials!");
    } else {
      router.push("/freelance/dashboard");
    }
  };
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="p-4">
      <p>this is login page</p>
      <button className="btn_primary px-4 py-1" onClick={login}>
        login
      </button>
    </div>
  );
};

export default Page;
