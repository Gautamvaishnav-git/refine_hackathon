import React from "react";
import IProp from "../lib/interfaces/IProp";
import RouterMounting from "@/app/shared/RouterMounting";
import { ToastContainer } from "react-toastify";
import AuthHeader from "@/app/shared/auth-header";
import { headers } from "next/headers";

const AuthLayout = ({ children }: IProp) => {
  const pathname = headers().get("referer");

  const pathMatcher = (path: string) => {
    return pathname?.match(path)?.[0] ? true : false;
  };

  return (
    <>
      <ToastContainer />
      <RouterMounting>
        {pathMatcher("/auth/login") || pathMatcher("/auth/signup") ? null : (
          <AuthHeader isProfilePage={pathMatcher("/auth/profile")} />
        )}
        {children}
      </RouterMounting>
    </>
  );
};

export default AuthLayout;
