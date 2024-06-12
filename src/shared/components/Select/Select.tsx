"use client";
import React, {
  DetailedHTMLProps,
  forwardRef,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActionMeta,
  components,
  default as ReactSelect,
  MultiValue,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  SingleValue,
  SingleValueProps,
} from "react-select";
import makeAnimated from "react-select/animated";
import cl from "classnames";

import styles from "./Select.module.scss";

import { Label } from "@/shared/components/Label/Label";
import CloseIcon from "@/shared/icons/close-in-circle.svg";

const animatedComponents = makeAnimated();

const baseClasses = cl(styles.base);

export interface SelectOption {
  label: string;
  value?: string;
}

type BaseSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type SelectProps = Omit<BaseSelectProps, "onChange"> & {
  className?: string;
  defaultValue?: SelectOption;
  options: SelectOption[];
  variant?: "dark";
  onChange?: (value: SelectOption) => void;
};

export const Select = forwardRef<SelectProps, SelectProps>(
  (
    {
      variant,
      className,
      options,
      defaultValue,
      multiple,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<
      SelectOption | undefined
    >(defaultValue);
    const [selectedValues, setSelectedValues] = useState<SelectOption[]>(
      defaultValue ? [defaultValue] : [],
    );

    useEffect(() => {
      console.log("Changed value: ", value);
      if (value) {
        setSelectedValue(
          value as
            | ((string | number | readonly string[]) & SelectOption)
            | undefined,
        );
      }
    }, [value]);

    const handleSetValue = (newValue: SelectOption) => {
      onChange?.(newValue);
      if (newValue.value === selectedValue?.value) {
        setSelectedValue(newValue);
      } else {
        setSelectedValue(undefined);
      }
    };

    const handleSetValues = (
      newValue: SelectOption[],
      action: ActionMeta<SelectOption>,
    ) => {
      if (action.action === "select-option" && action.option) {
        setSelectedValues([...selectedValues, action.option]);
      } else if (action.action === "remove-value" && action.removedValue) {
        const filteredValues = selectedValues.filter(
          (value) => value.value !== action.removedValue.value,
        );
        setSelectedValues(filteredValues);
      } else if (action.action === "clear") {
        setSelectedValues([]);
      }
    };

    const handleChange = (
      newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
      action: ActionMeta<SelectOption>,
    ) => {
      handleBlur();
      newValue &&
        (multiple
          ? handleSetValues(newValue as SelectOption[], action)
          : handleSetValue(newValue as SelectOption));
    };

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const renderSingleValue = ({
      children,
      ...props
    }: SingleValueProps<SelectOption>) => {
      return (
        <components.SingleValue {...props}>{children}</components.SingleValue>
      );
    };

    const renderMultiValueContainer = ({
      children,
      ...props
    }: MultiValueGenericProps<SelectOption>) => {
      return (
        <components.MultiValueContainer {...props}>
          <Label>{children}</Label>
        </components.MultiValueContainer>
      );
    };

    const renderMultiValueRemoveIcon = (
      props: MultiValueRemoveProps<SelectOption>,
    ) => (
      <components.MultiValueRemove {...props}>
        <CloseIcon />
      </components.MultiValueRemove>
    );

    return (
      <ReactSelect<SelectOption, boolean>
        // @ts-ignore
        ref={ref}
        components={{
          ...animatedComponents,
          SingleValue: renderSingleValue,
          MultiValueContainer: renderMultiValueContainer,
          MultiValueRemove: renderMultiValueRemoveIcon,
        }}
        className={cl(
          baseClasses,
          className,
          isFocused && styles.focused,
          variant && styles[variant],
        )}
        {...props}
        placeholder="Выберите значение"
        classNamePrefix="react-select"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMenuClose={handleBlur}
        onMenuOpen={handleFocus}
        value={multiple ? selectedValues : selectedValue}
        defaultValue={multiple ? selectedValues : selectedValue}
        onChange={handleChange}
        options={options}
        isMulti={multiple}
      />
    );
  },
);

Select.displayName = "Select";
