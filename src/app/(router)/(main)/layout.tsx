import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.scss";

import { GlobalProvider } from "@/app/_providers";

const font = Roboto({
  weight: ["300", "500"],
  variable: "--font-main",
  subsets: ["cyrillic", "latin"],
});

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
      <body className={font.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
