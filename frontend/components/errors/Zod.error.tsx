"use client";
import React from "react";
import { AxiosError as ErrorOfAxios } from "axios";
import { ErrorInterface } from "./errorInterface";
import { Button } from "react-day-picker";
import { ZodError } from "zod";

type AxiosError = ErrorInterface<ZodError>;

const ZError = ({ error, reset }: AxiosError) => {
  console.log("zod Error! " ,error);
  return (
    <div>
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default ZError;
