"use client";
import React from "react";
import ProfileForm, { IProfile } from "../ProfileForm";
import { toast } from "react-toastify";

const page = () => {
  const updateProfile = (data: IProfile) => {
    console.log(JSON.stringify(data));
  };
  return (
    <div>
      <section className="flex justify-center w-full">
        <div className="lg:w-1/2 md:w-2/3 sm:w-2/3 w-full pt-8 flex flex-col items-center">
          <ProfileForm update={updateProfile} />
        </div>
      </section>
    </div>
  );
};

export default page;
