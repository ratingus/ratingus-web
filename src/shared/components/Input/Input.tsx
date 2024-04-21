import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import cl from "classnames";

import styles from "./Input.module.scss";

const baseClasses = cl(styles.input);

type BaseInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputProps = BaseInputProps & {
  className?: string;
  sizeVariant?: "big" | "medium";
  variant?: "white" | "dark" | "ghost";
};

export const Input = ({
  className,
  sizeVariant = "medium",
  variant = "white",
  ...props
}: InputProps) => {
  return (
    <input
      className={cl(
        baseClasses,
        className,
        styles[sizeVariant],
        styles[variant],
      )}
      {...props}
    />
  );
};
