"use client";
import React, { useEffect } from "react";
import ProfileForm, { IProfile } from "../../components/ProfileForm";
import { toast } from "react-toastify";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/lib/interfaces/schema";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const supabase = createClientComponentClient<Database>();
  const [image, setImage] = React.useState<FileList | null>();
  const [src, setSrc] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [profileData, setProfileData] = React.useState<IProfile | null>(null);

  /**
   * set the user data into the user state
   * @param null
   */
  const userDataSetter = async () => {
    let user = (await supabase.auth.getUser()).data.user;
    user && setUser(user);
  };

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(user?.id || "");
  const updateProfile = async (data: IProfile) => {
    try {
      const userID = (await supabase.auth.getUser()).data.user?.id || "";
      const inserted = await supabase
        .from("profiles")
        .update({
          firstname: data.first_name,
          lastname: data.last_name,
          dob: data.dob,
          roles: data.role,
          username: data.user_name,
        })
        .eq("id", userID);
      const { data: imageData, error } = await toast.promise(
        supabase.storage.from("avatars").upload(userID, image?.item(0) as Blob),
        {
          pending: "Uploading image...",
        }
      );
      if (!error) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  const profileDataSetter = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (data) {
      setProfileData({
        dob: data?.dob || "",
        first_name: data?.first_name || "",
        role: data?.role,
        last_name: data?.last_name || "",
        user_name: data?.user_name || "",
      });
    }
  };

  useEffect(() => {
    userDataSetter();
    profileDataSetter();

    if (image && image.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target?.result as string);
      };
      reader.readAsDataURL(image?.item(0) as Blob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  return (
    <>
      <section className="flex justify-center w-full pb-8">
        <div className="lg:w-1/2 md:w-2/3 sm:w-2/3 w-full pt-8 flex flex-col items-center">
          <div className="flex w-full justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer w-28 h-28 rounded-full flex items-center justify-center flex-col overflow-hidden bg-secondary"
                  >
                    {src || publicUrl ? (
                      <Image
                        src={src ? src : publicUrl}
                        alt="user avatar"
                        width={150}
                        height={150}
                        className="w-full scale-105"
                      />
                    ) : (
                      <User2 />
                    )}
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {src ? "Choose another image." : "Upload profile image."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
          </div>
          <ProfileForm update={updateProfile} profileData={profileData} />
        </div>
      </section>
    </>
  );
};

export default Page;
