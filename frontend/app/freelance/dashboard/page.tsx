import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import React from "react";
import {cookies} from "next/headers";
import Wrapper from "./Wrapper";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getUser();
  return (
    <>
      <Wrapper />
    </>
  );
};

export default page;
