import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import cl from "classnames";

import styles from "./Textarea.module.scss";

const baseClasses = cl(styles.base);

type BaseInputProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
type InputProps = BaseInputProps & {
  className?: string;
  sizeVariant?: "big" | "medium";
  variant?: "white" | "dark" | "ghost";
};

export const Textarea = ({
  className,
  sizeVariant = "medium",
  variant = "white",
  ...props
}: InputProps) => {
  return (
    <textarea
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
