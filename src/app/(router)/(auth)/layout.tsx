import { ReactNode } from "react";

import styles from "./page.module.scss";

import LogoIcon from "@/shared/icons/Logo.svg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.base}>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          <LogoIcon className={styles.header} />
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </div>
  );
}
