import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex items-center w-full justify-between px-4 bg-secondary">
      <h2 className="text-xl font-bold text-secondary-foreground">logo</h2>
      <div>
        <div className="flex items-center gap-3">
          <Link className="font-medium text-secondary-foreground" href="/freelance/dashboard">
            Dashboard
          </Link>
          <Link className="font-medium text-secondary-foreground" href="/freelance/projects">
            Projects
          </Link>
          <Link className="font-medium text-secondary-foreground" href="/freelance/post/project">
            Post Project
          </Link>
          <Link className="font-medium text-secondary-foreground" href="/auth/profile">
            Profile
          </Link>
        </div>
      </div>
      <Image
        src={"/images/usericon.webp"}
        alt="user icon"
        width={100}
        height={100}
        className="rounded-full w-14"
      />
    </header>
  );
};

export default Navbar;
