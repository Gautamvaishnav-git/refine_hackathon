"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Login, { ILoginForm } from "../components/login";
import { toast } from "react-toastify";

const Page = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const login = async (loginData: ILoginForm) => {
    const { data, error } = await toast.promise(
      supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      }),
      {
        pending: "You are logging in...",
      }
    );
    if (error) {
      if (error?.message === "Invalid login credentials") {
        toast.error(error?.message);
      } else if (error?.message === "Failed to fetch") {
        toast.error("Failed to fetch! please check network connection.");
      }
    } else {
      router.refresh();
    }
  };

  return <Login login={login} />;
};

export default Page;
