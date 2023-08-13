"use client";
import React, { useEffect } from "react";
import ProfileForm, { IProfile } from "../../components/ProfileForm";
import { toast } from "react-toastify";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/interfaces/schema";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User2 } from "lucide-react";
import { profileService } from "./service";
import useFetch from "@/lib/hooks/useFetch.hook";

const Page = () => {
  const supabase = createClientComponentClient<Database>();
  const [image, setImage] = React.useState<FileList | null>();
  const [src, setSrc] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  const response = useFetch<IProfile>({
    async queryFn() {
      let user = (await supabase.auth.getUser()).data.user;
      user && setUser(user);
      const { data } = await supabase.from("profiles").select("*").eq("userId", user?.id).single();
      return {
        dob: data?.dob ?? "",
        first_name: data?.first_name ?? "",
        role: data?.role!,
        user_name: data?.user_name ?? "",
        last_name: data?.last_name ?? "",
      };
    },
    queryKey: "profileData",
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const { data } = supabase.storage.from("avatars").getPublicUrl(user?.id || "");
  const { publicUrl } = data;

  const updateProfile = async (data: IProfile) => {
    try {
      await profileService.updateProfile(data, supabase, { id: user?.id || "" }, image);
      await response.refetch();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    }
  };

  useEffect(() => {
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
      {response.isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="animate-spin rounded-full h-24 w-2h-24 border-b-2 border-primary"></div>
        </div>
      ) : null}
      <section className="flex justify-center w-full pb-8 bg-gradient-to-br via-purple-100/20 from-primary/20 pt-8 to-secondary dark:from-slate-800 dark:to-slate-900">
        <div className="lg:w-1/2 md:w-2/3 sm:w-2/3 w-full pt-8 pb-6 flex flex-col items-center bg-white/20 dark:bg-slate-900 backdrop-blur-sm shadow-lg shadow-gray-300/10 dark:shadow-gray-900 border border-primary/20 rounded">
          <div className="flex w-full justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <label htmlFor="avatar" className="cursor-pointer w-28 h-28 rounded-full flex items-center justify-center flex-col overflow-hidden bg-secondary">
                    {src || publicUrl ? <Image src={src ? src : publicUrl} alt="user avatar" width={150} height={150} className="w-full scale-105" /> : <User2 />}
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{src ? "Choose another image." : "Upload profile image."}</p>
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
          <ProfileForm update={updateProfile} profileData={response.data} />
        </div>
      </section>
    </>
  );
};

export default Page;
