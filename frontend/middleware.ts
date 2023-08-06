import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const requestUrl = new URL(req.url);
  const path = requestUrl.pathname;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && path === "/auth/signup") {
    return NextResponse.redirect(new URL("/freelance/dashboard", requestUrl));
  }

  if (user && path === "/") {
    return NextResponse.redirect(new URL("/freelance/dashboard", requestUrl));
  }

  if (user && path === "/auth/login") {
    return NextResponse.redirect(new URL("/freelance/dashboard", requestUrl));
  }

  if (!user && path !== "/auth/login" && path !== "/auth/signup") {
    return NextResponse.redirect(new URL("/auth/login", requestUrl));
  }

  return res;
};

export const config = {
  matcher: [
    "/freelance/:path*",
    "/jobseeker/:path*",
    "/",
    "/auth/:path*",
  ],
};
export default middleware;
