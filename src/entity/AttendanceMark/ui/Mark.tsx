import React from "react";
import cl from "classnames";

import styles from "./Mark.module.scss";

import { ATTENDANCE } from "@/entity/AttendanceMark/constants";
import { getColorByMark } from "@/entity/AttendanceMark/helpers";
import { Lesson } from "@/entity/Lesson/model";
import {
  Typography,
  TypographyVariant,
} from "@/shared/components/Typography/Typography";

type MarkProps = {
  className?: string;
  mark?: Lesson["mark"];
  attendance?: Lesson["attendance"];
  variant?: TypographyVariant;
};

const Mark = ({ className, mark, attendance, variant = "h2" }: MarkProps) => {
  if (!mark && !attendance) {
    return null;
  }
  const att = attendance
    ? ATTENDANCE[attendance].slice(0, 1).toUpperCase()
    : "";
  return (
    <Typography
      className={cl(styles.base, className)}
      variant={variant}
      color={getColorByMark(mark || att)}
    >
      {mark || att}
      {mark && attendance && (
        <Typography
          className={styles.attendance}
          variant="body"
          color={getColorByMark(attendance)}
        >
          {att}
        </Typography>
      )}
    </Typography>
  );
};

export default Mark;
