import React from "react";
import IProp from "../lib/interfaces/IProp";
import RouterMounting from "@/app/shared/RouterMounting";
import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }: IProp) => {
  return (
    <>
      <ToastContainer />
      <RouterMounting>{children}</RouterMounting>
    </>
  );
};

export default AuthLayout;
