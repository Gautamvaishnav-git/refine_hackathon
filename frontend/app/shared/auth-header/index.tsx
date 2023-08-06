import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

const Header = ({ isProfilePage }: { isProfilePage: boolean }) => {
  return (
    <div className="flex items-center justify-between w-full py-2 px-4">
      <Link href={"/"} passHref>
        <Button variant={"outline"}>
          <ArrowLeftToLine className="pr-2" /> Back To Home
        </Button>
      </Link>
      {!isProfilePage && (
        <Link href={"/auth/profile"} passHref>
          <Button variant={"outline"}>
            Go To Profile
            <ArrowRightToLine className="pl-2" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
