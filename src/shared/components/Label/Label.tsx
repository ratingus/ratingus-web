import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cl from "classnames";

import styles from "./Label.module.scss";

const baseClasses = cl(styles.base);

type BaseLabelProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type LabelProps = BaseLabelProps & {
  className?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "error";
};

export const Label = ({
  className,
  children,
  variant = "primary",
  ...props
}: LabelProps) => (
  <div className={cl(baseClasses, className, styles[variant])} {...props}>
    {children}
  </div>
);
