"use client";
import { ReactNode } from "react";

import styles from "./page.module.scss";

import PageContainer from "@/shared/components/PageContainer/PageContainer";

export default function Layout({
  children,
  detailed,
}: {
  children: ReactNode;
  detailed: ReactNode;
}) {
  return (
    <PageContainer isPanel className={styles.base}>
      <aside className={styles.week}>{children}</aside>
      <section className={styles.detailed}>{detailed}</section>
    </PageContainer>
  );
}
