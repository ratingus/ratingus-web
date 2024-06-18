"use client";

import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useId,
  useState,
} from "react";
import cl from "classnames";

import styles from "./Checkbox.module.scss";

import Icon from "@/shared/icons/checkmark.svg";

type BaseInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type CheckboxProps = BaseInputProps;

export const Checkbox = ({
  className,
  id,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const baseId = useId();
  const checkboxId = [baseId, id].join("_");
  const [value, setValue] = useState(!!checked);

  useEffect(() => {
    setValue(!!checked);
  }, [checked]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.checked);
    onChange?.(e);
  };

  return (
    <div className={cl(styles.wrapper, props.disabled && styles.disabled)}>
      <input
        {...props}
        id={checkboxId}
        className={cl(className)}
        checked={value}
        onChange={handleChange}
        type="checkbox"
      />
      <label htmlFor={checkboxId} />
      {value && <Icon />}
    </div>
  );
};
