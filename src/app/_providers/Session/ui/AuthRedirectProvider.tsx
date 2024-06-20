"use client";
import React, { ReactNode, useEffect } from "react";
import HeaderIcon from "@icons/header.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { actionSetSelectedSchool } from "@/entity/School/store";
import Button from "@/shared/components/Button/Button";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";
import useResolution from "@/shared/hooks/useResolution";

type AuthRedirectProviderProps = {
  children: ReactNode;
};

const AuthRedirectProvider = ({ children }: AuthRedirectProviderProps) => {
  const { isMobile } = useResolution();
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { data: user, status } = useSession();

  useEffect(() => {
    dispatch(actionSetSelectedSchool(parseInt(user?.school || "") || null));
  }, [dispatch, user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        status === "unauthenticated" &&
        !(path === "/login" || path === "/registration" || path === "/")
      ) {
        router.push("/login");
      }
    }
  }, [router, path, status]);

  if (isMobile) {
    return (
      <div
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
          }}
        >
          Сайт пока не поддерживается на мобильных устройствах
        </Typography>
        <Image
          src="/images/mobile_ratingus.png"
          alt="Мобильный рейтингус"
          height={160}
          width={300}
          style={{
            textAlign: "center",
            objectFit: "cover",
            width: "300px",
            height: "160px",
            objectPosition: "350% 0",
          }}
        />
        <Link href="https://github.com/ratingus/ratingus_mobile/releases/latest/download/ratingus.apk">
          <Button variant="important">Скачайте мобильное приложение!</Button>
        </Link>
      </div>
    );
  }

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
