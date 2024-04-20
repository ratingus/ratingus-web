import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cl from "classnames";

import styles from "./Button.module.scss";

import LoadingIcon from "@/shared/icons/tube-spinner.svg";

const baseClasses = cl(styles.button);

type BaseButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type ButtonProps = BaseButtonProps & {
  variant?: "primary" | "important" | "secondary" | "error" | "ghost";
  sizeVariant?: "big" | "medium";
  isActive?: boolean;
  isDisable?: boolean;
  isLoading?: boolean;
};

const Button = ({
  className,
  children,
  variant = "primary",
  sizeVariant = "medium",
  isActive,
  isDisable,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cl(
        baseClasses,
        className,
        styles[variant],
        styles[sizeVariant],
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
};

export default Button;
