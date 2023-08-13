import { ModeToggle } from "@/components/ui/switchTheme";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "react-day-picker";

const Navbar = () => {
  return (
    <header className="flex items-center w-full justify-between px-4 bg-secondary py-4 sticky top-0 z-[189]">
      <h2 className="text-xl font-bold text-secondary-foreground">logo</h2>
      <div>
        <div className="flex items-center gap-3">
          <Link className="font-medium text-secondary-foreground dark:white" href="/freelance/dashboard">
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
      <ModeToggle />
    </header>
  );
};

export default Navbar;
