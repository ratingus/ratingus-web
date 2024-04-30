"use client";
import React, { ReactNode, useEffect, useState } from "react";
import HeaderIcon from "@icons/header.svg";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

type AuthRedirectProviderProps = {
  children: ReactNode;
};

const AuthRedirectProvider = ({ children }: AuthRedirectProviderProps) => {
  const router = useRouter();
  const path = usePathname();
  const [isAuthRedirected, setIsAuthRedirected] = useState<boolean>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUserLoggedIn = Cookies.get("isLogged") === "true";

      if (!isUserLoggedIn) {
        router.push("/login");
      } else if (path === "/") {
        router.push("/announcements");
      }
      setIsAuthRedirected(true);
    }
  }, [router, path]);

  // TODO: вынести в loading.tsx и пока не загрузилось, вызывать лоадер некста, а не вот это вот что это вообще такое
  if (!isAuthRedirected) {
    return (
      <motion.div
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }} // Adjust the duration as needed
      >
        <HeaderIcon />
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default AuthRedirectProvider;