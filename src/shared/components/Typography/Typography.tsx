import React, { ElementType, ReactNode } from "react";
import cl from "classnames";

import styles from "./Typography.module.scss";

import vars from "@/shared/styles/vars.module.scss";

const baseClasses = cl(styles.base);

type TypographyProps = {
  className?: string;
  children: ReactNode;
  variant?: TypographyVariant;
  color?: keyof typeof vars;
  component?: ElementType;
  italic?: boolean;
  passColor?: boolean;
  weight?: TypographyWeight;
  style?: Record<string, string | number>;
};

export type TypographyWeight = "bold" | "lighter" | "normal";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small"
  | "caption";

export const Typography = ({
  className,
  variant,
  color = "textPrimary",
  children,
  component = "div",
  italic,
  weight,
  passColor,
  ...props
}: TypographyProps) => {
  // @ts-ignore
  const Component: ElementType = component;
  return (
    <Component
      className={cl(
        baseClasses,
        styles[`variant-${variant}`],
        weight && styles[weight],
        italic && styles.italic,
        className,
      )}
      style={passColor ? {} : { color: vars[color] }}
      {...props}
    >
      {children}
    </Component>
  );
};
