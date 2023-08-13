"use client";
import React from "react";
import { AxiosError as ErrorOfAxios } from "axios";
import { ErrorInterface } from "./errorInterface";
import { Button } from "react-day-picker";

type AxiosError = ErrorInterface<ErrorOfAxios>;

const AxsError = ({ error, reset }: AxiosError) => {
  console.log("axios error", error);
  return (
    <div>
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default AxsError;
