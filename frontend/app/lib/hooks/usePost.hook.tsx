"use client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IProp<T> {
  body: T;
  endPoint: string;
  config: AxiosRequestConfig;
}

const usePost = <TData, TBody>({ body, endPoint, config }: IProp<TBody>) => {
  const response = useMutation<AxiosResponse<TData>>({
    mutationFn: async () => {
      const response = await axios.post<TData>(endPoint, body, { ...config });
      return response;
    },
  });
  return response;
};

export default usePost;
