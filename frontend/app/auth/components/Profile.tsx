import ToolTip from "@/app/shared/tool-tip";
import { CornerDownRight, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Row from "./Row";
import { Activity } from "lucide-react";
import { ProfileRow } from "../profile/page";

interface IProp {
  imageURI: string;
  profileData: ProfileRow | undefined;
  userID: string | undefined;
}

const Profile = ({ imageURI, profileData, userID }: IProp) => {
  return (
    <>
      <section className="flex flex-col gap-3 sm:w-2/4 md:w-2/5 shadow-lg bg-primary-foreground px-3 py-4 rounded-lg border border-primary/50 mx-auto">
        <Link href="/auth/profile/update" className="w-fit self-end" passHref>
          <ToolTip toolTipText="edit profile">
            <Settings className="p-2 w-fit h-fit bg-transparent border-primary/30 border hover:bg-primary hover:text-primary-foreground rounded-full text-secondary-foreground duration-150" />
          </ToolTip>
        </Link>
        <div className=" w-fit h-fit mx-auto relative">
          <Image
            src={imageURI}
            alt="user profile"
            width={200}
            height={200}
            className="rounded-full mx-auto border-4 border-secondary"
            draggable={false}
          />
          {profileData?.id === userID && (
            <div className="w-6 h-6 rounded-full bg-green-500 absolute ring-4 ring-offset-0 ring-secondary bottom-4 right-4"></div>
          )}
        </div>
        {profileData && (
          <div className="w-5/6 mx-auto pt-6">
            <h2 className="font-semibold block text-primary pb-4 cursor-pointer">
              @{profileData?.user_name}
            </h2>
            <h2 className="text-xl font-bold capitalize">
              {profileData?.first_name + (" " + profileData?.last_name || "")}
              <span className="text-sm w-fit font-normal block">
                <Row
                  Icon={CornerDownRight}
                  detailText={profileData?.role}
                  inputClasses={["gap-3", "py-4"]}
                />
              </span>
            </h2>
            <div className="pt-4">
              <span className="text-sm font-semibold">Member since</span>
              <Row
                Icon={Activity}
                detailText={
                  new Date(profileData.created_at || "").toLocaleDateString() ||
                  ""
                }
                inputClasses={["gap-3", "justify-start", "pt-2"]}
              />
            </div>
            <div className="pt-6">
              <span className="text-sm font-semibold">Date of Birth</span>
              <Row
                Icon={Activity}
                detailText={
                  new Date(profileData.dob || "").toLocaleDateString() || ""
                }
                inputClasses={["gap-3", "justify-start", "pt-2"]}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
