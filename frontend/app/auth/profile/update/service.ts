import { SupabaseClient } from "@supabase/supabase-js";
import { IProfile } from "../../components/ProfileForm";
import { Database } from "@/lib/interfaces/schema";
import { toast } from "react-toastify";

const updateProfile = async (data: IProfile, supabase: SupabaseClient<Database>, user: { id: string }, image: FileList | null | undefined) => {
  try {
    const exist = await supabase.from("profiles").select("*").single();
    if (!exist.data) {
      await toast.promise(
        async () => {
          supabase.from("profiles").insert({
            first_name: data.first_name,
            last_name: data.last_name,
            dob: data.dob,
            role: data.role,
            user_name: data.user_name,
            userId: user?.id,
          });
        },
        {
          pending: "Creating profile...",
          success: "Profile created successfully",
          error: "Error creating profile",
        }
      );
    } else {
      await toast.promise(
        async () => {
          const { data: profileData, error } = await supabase
            .from("profiles")
            .update({
              first_name: data.first_name,
              last_name: data.last_name,
              dob: data.dob,
              /** is user profile is already created then he should not be able to edit the role! */
              role: data.role,
            })
            .eq("userId", user?.id);
          if (error) {
            toast.error(error.message);
            throw error;
          }
        },
        {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Error updating profile",
        }
      );
    }
    const { data: imageData, error } = await toast.promise(supabase.storage.from("avatars").upload(String(user?.id), image?.item(0) as Blob), {
      pending: "Uploading image...",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("image uploaded successfully");
      console.log(imageData);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
};

export const profileService = {
  updateProfile,
};
