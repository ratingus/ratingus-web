import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const extractTokenFromSetCookie = (setCookieHeader: string[]) => {
  const match = setCookieHeader[0].match(/token=([^;]+)/);
  return match ? match[1] : null;
};

export default api;
