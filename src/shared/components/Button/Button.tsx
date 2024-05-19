import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cl from "classnames";
import Link from "next/link";

import styles from "./Button.module.scss";

import LoadingIcon from "@/shared/icons/tube-spinner.svg";

const baseClasses = cl(styles.button);

type BaseButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type ButtonProps = BaseButtonProps & {
  variant?: "primary" | "important" | "secondary" | "error" | "ghost";
  link?: string;
  sizeVariant?: "big" | "medium";
  isActive?: boolean;
  isDisable?: boolean;
  isLoading?: boolean;
};

const Button = ({
  className,
  children,
  variant = "primary",
  sizeVariant,
  isActive,
  isDisable,
  isLoading,
  link,
  ...props
}: ButtonProps) => {
  const ButtonComponent = (
    <button
      className={cl(
        baseClasses,
        className,
        styles[variant],
        sizeVariant && styles[sizeVariant],
        styles[isActive ? "active" : ""],
        styles[isDisable ? "disable" : ""],
      )}
      {...props}
    >
      <>
        {children}
        {isLoading && (
          <LoadingIcon className={cl(styles.loading, styles[variant])} />
        )}
      </>
    </button>
  );
  if (link) {
    return (
      <Link href={link} passHref className={styles.link}>
        {ButtonComponent}
      </Link>
    );
  }
  return ButtonComponent;
};

export default Button;
