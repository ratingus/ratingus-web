import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  config.headers["Authorization"] = "Bearer " + session?.accessToken || "";
  return config;
});

export const extractTokenFromSetCookie = (setCookieHeader: string[]) => {
  const match = setCookieHeader[0].match(/token=([^;]+)/);
  return match ? match[1] : null;
};

export default api;
