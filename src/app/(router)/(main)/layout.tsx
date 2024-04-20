import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

import { GlobalProvider } from "@/app/_providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Рейтингус",
  description:
    'Платформа для дистанционного управления учебным процессом в школах "Рейтингус"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
