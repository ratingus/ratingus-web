"use client";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { MockingProvider } from "./Mocking";
import { SessionProvider } from "./Session";
import { StoreProvider } from "./Store";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const isLogged = Cookies.get("isLogged");
  const router = useRouter();

  if (isLogged === undefined) {
    router.push("/login");
  }

  return (
    <StoreProvider>
      <SessionProvider>
        <MockingProvider>{children}</MockingProvider>
      </SessionProvider>
    </StoreProvider>
  );
};

export default Provider;
