import cl from "classnames";

import styles from "./ButtonGroup.module.scss";

import Button, { ButtonProps } from "@/shared/components/Button/Button";

const baseClasses = cl(styles.base);

export type ButtonGroupProps = {
  buttons: ButtonProps[];
  className?: string;
} & Pick<ButtonProps, "variant" | "sizeVariant">;

export const ButtonGroup = ({
  buttons,
  className,
  variant,
  sizeVariant,
}: ButtonGroupProps) => {
  return (
    <div className={cl(baseClasses, className)}>
      {buttons.map(
        (
          {
            key,
            variant: propsVariant,
            sizeVariant: propsSizeVariant,
            ...buttonProps
          },
          index,
        ) => (
          <Button
            key={key || index}
            {...buttonProps}
            variant={propsVariant || variant}
            sizeVariant={propsSizeVariant || sizeVariant}
          />
        ),
      )}
    </div>
  );
};
