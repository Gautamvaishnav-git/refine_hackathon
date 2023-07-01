"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const supabase = createClientComponentClient({});
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const Register = async () => {
    const response = await supabase.auth.signUp({
      email: "gauravvaishnav8690@gmail.com",
      password: "this is my password",
      options: {
        data: {
          name: "Gaurav Vaishnav",
          age: 30,
          role: "admin",
        },
        emailRedirectTo: `${window.location.origin}/auth/verify`,
      },
    });
    console.log("🟢 ~ file: page.tsx:25 ~ Register ~ response.error?.message:", response.error?.message)
    console.log("🟢 ~ file: page.tsx:27 ~ Register ~ response.data:", response.data)
    alert(JSON.stringify(response.data.user));
    router.refresh();
  };

  return (
    <div className="p-4">
      <h1 className="p-4">sign up</h1>
      <button className="btn_primary" onClick={Register}>
        Register to see the dashboard
      </button>
    </div>
  );
};

export default Page;
