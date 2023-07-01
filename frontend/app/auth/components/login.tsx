import Link from "next/link";
import React from "react";

const Login = ({ login }: { login: () => void }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/images/login.webp')] bg-cover">
      <div className="flex flex-col gap-3 bg-white/20 backdrop-blur-sm px-4 py-6 rounded sm:h-1/2 md:w-1/3 sm:w-1/2 border border-white/20">
        <h1 className="text-3xl text-white font-bold text-left pb-4">
          Login to access application.
        </h1>
        <input type="email" required className="p-2 rounded outline-none bg-transparent autofill:bg-transparent border border-white/30 text-white" />
        <input type="password" required className="p-2 rounded outline-none bg-transparent autofill:bg-transparent border border-white/30 text-white" />
        <button className="btn_primary" onClick={login}>
          Login
        </button>
        <div className="flex items-center justify-between text-white">
          <span>{"don't"} have an account?</span>
          <Link href="/auth/signup" >Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
