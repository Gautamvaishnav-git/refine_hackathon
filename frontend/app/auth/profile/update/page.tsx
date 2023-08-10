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
import usePost from "@/app/lib/hooks/usePost.hook";

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
  const AuthUserDataSetter = async () => {
    let user = (await supabase.auth.getUser()).data.user;
    user && setUser(user);
  };

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(user?.id || "");
  const { publicUrl } = data;

  const updateProfile = async (data: IProfile) => {
    console.log(data);
    console.log(image);
    try {
      const exist = await supabase.from("profiles").select("*").single();
      console.log(exist);
      // exist.data?.userId
      // const inserted = await supabase
      //   .from("profiles")
      //   .update({
      //     first_name: data.first_name,
      //     last_name: data.last_name,
      //     dob: data.dob,
      //     role: data.role,
      //     user_name: data.user_name,
      //     userId: user?.id,
      //   })
      //   .eq("userId", user?.id);
      const { data: imageData, error } = await toast.promise(
        supabase.storage
          .from("avatars")
          .upload(String(user?.id), image?.item(0) as Blob),
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

  /** ***set profile data of user*** */
  const supabaseProfileData = async () => {
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
    AuthUserDataSetter();
    supabaseProfileData();

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
      <section className="flex justify-center w-full pb-8 bg-gradient-to-br via-purple-100/20 from-primary/20 pt-8 to-secondary">
        <div className="lg:w-1/2 md:w-2/3 sm:w-2/3 w-full pt-8 pb-6 flex flex-col items-center bg-white/20 backdrop-blur-sm shadow-lg shadow-gray-300/10 border border-primary/20 rounded">
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
