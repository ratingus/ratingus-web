"use client";
import React, { ReactNode, useEffect } from "react";
import HeaderIcon from "@icons/header.svg";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type AuthRedirectProviderProps = {
  children: ReactNode;
};

const AuthRedirectProvider = ({ children }: AuthRedirectProviderProps) => {
  const router = useRouter();
  const path = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        status === "unauthenticated" &&
        !(path === "/login" || path === "/registration")
      ) {
        router.push("/login");
      } else if (status === "authenticated") {
        router.push("/profile");
      }
    }
  }, [router, path, status]);

  // TODO: вынести в loading.tsx и пока не загрузилось, вызывать лоадер некста, а не вот это вот что это вообще такое
  if (status === "loading") {
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
