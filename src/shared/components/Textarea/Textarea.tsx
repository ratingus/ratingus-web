import {
  DetailedHTMLProps,
  FormEventHandler,
  TextareaHTMLAttributes,
  useCallback,
} from "react";
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
  const autoResize: FormEventHandler<HTMLTextAreaElement> = useCallback(
    ({ currentTarget }) => {
      currentTarget.style.height = "auto";
      currentTarget.style.height = currentTarget.scrollHeight - 4 + "px";
    },
    [],
  );
  return (
    <textarea
      className={cl(
        baseClasses,
        styles[sizeVariant],
        styles[variant],
        className,
      )}
      onInput={autoResize}
      rows={1}
      {...props}
    />
  );
};
