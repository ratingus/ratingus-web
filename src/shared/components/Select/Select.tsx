"use client";
import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  useCallback,
  useState,
} from "react";
import { default as ReactSelect, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import cl from "classnames";

import styles from "./Select.module.scss";

const animatedComponents = makeAnimated();

const baseClasses = cl(styles.base);

export interface SelectOption {
  label: string;
  value: string;
}

type BaseSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type SelectProps = BaseSelectProps & {
  className?: string;
  defaultValue?: SelectOption;
  options: SelectOption[];
};

export const Select = ({ className, options, defaultValue }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
    defaultValue,
  );

  const handleChange = (newValue: SingleValue<SelectOption>) => {
    handleBlur();
    newValue && setSelectedValue(newValue);
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <ReactSelect<SelectOption>
      components={animatedComponents}
      className={cl(baseClasses, className, isFocused && styles.focused)}
      placeholder="Выберите значение"
      classNamePrefix="react-select"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMenuClose={handleBlur}
      onMenuOpen={handleFocus}
      defaultValue={selectedValue}
      onChange={handleChange}
      options={options}
    />
  );
};
