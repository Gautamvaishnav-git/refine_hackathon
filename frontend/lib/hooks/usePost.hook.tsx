"use client";
import { useMutation } from "@tanstack/react-query";
import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

interface IProp {
  endPoint: string;
  config?: AxiosRequestConfig;
}

const usePost = <TData, TBody = object>({ endPoint, config }: IProp) => {
  const response = useMutation<AxiosResponse<TData>, unknown, { body: TBody }>({
    mutationFn: async ({ body }) => {
      const response = await axios.post<TData>(endPoint, body, {
        ...config,
      });
      return response;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    },
  });
  return response;
};

export default usePost;
