"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Signup from "../components/signup";
import { toast } from "react-toastify";
import { ISignUp } from "../components/signup";
import Link from "next/link";
import { AuthResponse } from "@supabase/supabase-js";
import { Mail } from "lucide-react";
import { Database } from "@/app/lib/interfaces/schema";
import Loader from "@/app/shared/Loader";

const Page = () => {
  const supabase = createClientComponentClient<Database>();
  const [authResponse, setAuthResponse] = useState<AuthResponse>();
  const router = useRouter();
  const Register = async (details: ISignUp) => {
    try {
      const response = await toast.promise(
        supabase.auth.signUp({
          email: "gauravvaishnav8690@gmail.com",
          password: "this is my password",
          options: {
            emailRedirectTo: `${window.location.origin}/auth/verify`,
          },
        }),
        {
          pending: "Signing up...",
          success: "A confirmation mail has been sent to your email address",
        }
      );
      setAuthResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {authResponse?.data.user?.aud == "authenticated" && (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-secondary-foreground/30 backdrop-blur-sm sm:px-0 px-6 fixed top-0 left-0">
          <div className="sm:w-1/3 md:w-80 w-full h-fit flex flex-col items-center gap-3 py-6 px-4 rounded bg-primary-foreground">
            <h2 className="text-center">
              A confirmation mail has been sent to your email address.
            </h2>
            <a href="https://mail.google.com/">
              <Button variant={"outline"}>
                <Mail className="mr-2" />
                <span>Open Gmail.</span>
              </Button>
            </a>
          </div>
        </div>
      )}
      <Signup signUp={Register} />
    </>
  );
};

export default Page;
