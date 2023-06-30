import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      this is dashboard page
      <Link href="/auth/logout" className="p-2">Logout</Link>
      <button className="outline-none py-2 px-3 rounded bg-primary text-white">
        this is the dashboard
      </button>
    </div>
  );
};

export default page;
