import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IProps<TRes> {
  queryKey: string;
  queryFn: () => Promise<TRes>;
  options?: UseQueryOptions<TRes, unknown, TRes, QueryKey>;
}

const useFetch = <TRes,>({ queryKey, queryFn, options }: IProps<TRes>) => {
  const response = useQuery<TRes>({
    queryKey: [queryKey],
    queryFn: async () => {
      const data = await queryFn();
      return data;
    },
    ...options,
  });
  return response;
};

export default useFetch;
