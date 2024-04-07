import {ReactNode} from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {GlobalProvider} from "@/app/_providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Рейтингус",
  description: "Платформа для дистанционного управления учебным процессом в школах \"Рейтингус\"",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
