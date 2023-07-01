import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getUser();
  return (
    <div>
      <h2 className="p-2 text-primary">welcome {session?.data?.user?.user_metadata?.name}</h2>
      this is dashboard page
      <Link href="/auth/logout" className="p-2">
        Logout
      </Link>
      <button className="outline-none py-2 px-3 rounded bg-primary text-white">
        this is the dashboard
      </button>
    </div>
  );
};

export default page;
