import { ReactNode } from "react";

import Header from "@/widget/Header/Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
