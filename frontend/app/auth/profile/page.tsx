import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/lib/interfaces/schema";
import Profile from "../components/Profile";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });
  const userID = (await supabase.auth.getUser()).data.user?.id;
  const profileData = (
    await supabase.from("profiles").select("*").eq("id", userID)
  ).data;
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(userID || "");
  return (
    <div className="py-6 sm:px-0 px-4 w-full bg-secondary min-h-screen">
      <Profile
        imageURI={publicUrl}
        profileData={profileData?.[0]}
        userID={userID}
      />
    </div>
  );
};

export default page;
