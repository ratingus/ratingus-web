import { DetailedHTMLProps, InputHTMLAttributes, useId } from "react";
import cl from "classnames";

import styles from "./Checkbox.module.scss";

import Icon from "@/shared/icons/checkmark.svg";

type BaseInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type CheckboxProps = BaseInputProps;

export const Checkbox = ({ className, id, ...props }: CheckboxProps) => {
  const baseId = useId();
  const checkboxId = [baseId, id].join("_");
  return (
    <div className={cl(styles.wrapper, props.disabled && styles.disabled)}>
      <input
        {...props}
        id={checkboxId}
        className={cl(className)}
        type="checkbox"
      />
      {props.checked && <Icon />}
      <label htmlFor={checkboxId} />
    </div>
  );
};
