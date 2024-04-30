"use client";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type AuthRedirectProviderProps = {
  children: ReactNode;
};

const AuthRedirectProvider = ({ children }: AuthRedirectProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== "undefined") {
      const isUserLoggedIn = Cookies.get("isLogged") === "true";

      if (!isUserLoggedIn) {
        router.push("/login");
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthRedirectProvider;
