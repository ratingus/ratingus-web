import React, { ReactNode } from "react";
import cl from "classnames";

import styles from "./PageContainer.module.scss";

type PageContainerProps = {
  ignoreHeader?: boolean;
  isPanel?: boolean;
  children: ReactNode;
  actionSlot?: ReactNode;
  className?: string;
};

const PageContainer = ({
  ignoreHeader,
  isPanel,
  children,
  actionSlot,
  className,
}: PageContainerProps) => {
  const classNames = cl(styles.base, ignoreHeader ? styles.ignoreHeader : "");
  const panelClassNames = cl(
    styles.panelBase,
    isPanel ? styles.isPanel : "",
    className,
  );
  return (
    <main className={classNames}>
      {actionSlot && <div className={styles.actionSlot}>{actionSlot}</div>}
      <div className={panelClassNames}>{children}</div>
    </main>
  );
};

export default PageContainer;
