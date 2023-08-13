"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AxiosError as ErrorOfAxios } from "axios";
import AxsError from "@/components/errors/Axios.error";
import { ZodError } from "zod";
import ZError from "@/components/errors/Zod.error";
import ErrorDialog from "@/components/errors/ErrorDialog";
// import Error from "next/error";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (error instanceof ErrorOfAxios) {
    return <AxsError error={error} reset={reset} />;
  }

  if (error instanceof ZodError) {
    return <ZError error={error} reset={reset} />;
  }

  return <ErrorDialog message={error.message} reset={reset} />;
}

export default Error;
