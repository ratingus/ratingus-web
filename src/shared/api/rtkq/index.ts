import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

import api from "@/shared/api/axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  }> =>
  async ({ url, method, data, params, headers }) => {
    try {
      console.log("rtkq url:");
      console.log(process.env.NEXT_PUBLIC_API_URL);
      console.log(baseUrl + url);
      const session = await getSession();
      console.log("token: ", session?.accessToken);
      const result = await api({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
