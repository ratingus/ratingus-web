"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

import AuthRedirectProvider from "@/app/_providers/Session/ui/AuthRedirectProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthRedirectProvider>{children}</AuthRedirectProvider>
    </SessionProvider>
  );
};

export default Providers;
