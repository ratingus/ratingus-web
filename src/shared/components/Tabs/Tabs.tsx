"use client";
import { ReactNode, useState } from "react";
import cl from "classnames";

import styles from "./Tabs.module.scss";

import {
  ButtonGroup,
  ButtonGroupProps,
} from "@/shared/components/ButtonGroup/ButtonGroup";

const baseClasses = cl(styles.base);

export type TabOption<T> = {
  value: T;
  label: string;
};

type TabsProps<T> = {
  defaultOption?: TabOption<T>;
  options: (TabOption<T> & {
    renderOption?: ReactNode;
  })[];
  onChange?: (value: TabOption<T>) => void;
  className?: string;
  loadingValue?: T;
} & Omit<ButtonGroupProps, "buttons">;

export const Tabs = <T = string,>({
  options,
  className,
  defaultOption,
  onChange,
  loadingValue,
  ...props
}: TabsProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<TabOption<T> | undefined>(
    defaultOption,
  );

  const handleLabelClick = (value: TabOption<T>) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <ButtonGroup
      className={cl(baseClasses, className)}
      buttons={options.map(({ value, label, renderOption }) => ({
        key: label,
        isActive: value === selectedValue?.value,
        isLoading: value === loadingValue,
        onClick: () => handleLabelClick({ value, label }),
        children: renderOption || label,
      }))}
      {...props}
    />
  );
};
