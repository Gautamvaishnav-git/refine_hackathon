"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      {JSON.stringify(user)}
      <Link href="/auth/profile/update" passHref>
        <Button>Update profile</Button>
      </Link>
    </div>
  );
};

export default page;
