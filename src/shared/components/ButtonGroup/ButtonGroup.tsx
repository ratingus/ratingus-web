import cl from "classnames";

import styles from "./ButtonGroup.module.scss";

import Button, { ButtonProps } from "@/shared/components/Button/Button";

const baseClasses = cl(styles.base);

export type ButtonGroupProps = {
  buttons: ButtonProps[];
  className?: string;
} & Pick<ButtonProps, "variant" | "sizeVariant" | "isDisable">;

export const ButtonGroup = ({
  buttons,
  className,
  variant,
  sizeVariant,
}: ButtonGroupProps) => {
  return (
    <div
      className={cl(
        baseClasses,
        buttons.length === 1 ? styles.one : "",
        className,
      )}
    >
      {buttons.map(
        (
          {
            key,
            variant: propsVariant,
            sizeVariant: propsSizeVariant,
            link,
            ...buttonProps
          },
          index,
        ) => (
          <Button
            key={key || link || index}
            {...buttonProps}
            variant={propsVariant || variant}
            sizeVariant={propsSizeVariant || sizeVariant}
            link={link}
          />
        ),
      )}
    </div>
  );
};
