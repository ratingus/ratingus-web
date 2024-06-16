import {
  DetailedHTMLProps,
  FormEvent,
  FormEventHandler,
  forwardRef,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
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

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, sizeVariant = "medium", variant = "white", ...props }, ref) => {
    const autoResize: FormEventHandler<HTMLTextAreaElement> = useCallback(
      ({ currentTarget }) => {
        currentTarget.style.height = "auto";
        currentTarget.style.height = `${currentTarget.scrollHeight}px`;
      },
      [],
    );
    const [init, setInit] = useState(false);

    useEffect(() => {
      if (ref) {
        autoResize({
          // @ts-ignore
          currentTarget: ref.current,
        } as FormEvent<HTMLTextAreaElement>);
      }
      setInit(true);
    }, [autoResize, ref, init]);

    return (
      <textarea
        ref={ref}
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
  },
);

Textarea.displayName = "Textarea";
