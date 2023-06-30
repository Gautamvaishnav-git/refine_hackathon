"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const supabase = createClientComponentClient();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    if (!error) {
      router.push("/auth/login");
    } else {
      alert(`"error": ${error}}`);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      <h2>log out</h2>
      <button className="btn_primary" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Page;
