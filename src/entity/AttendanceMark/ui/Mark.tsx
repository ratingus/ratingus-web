import React from "react";

import { ATTENDANCE } from "@/entity/AttendanceMark/constants";
import { getColorByMark } from "@/entity/AttendanceMark/helpers";
import { Lesson } from "@/entity/Lesson/model";
import {
  Typography,
  TypographyVariant,
} from "@/shared/components/Typography/Typography";

// import styles from './Mark.module.scss';

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
  return (
    <Typography
      className={className}
      variant={variant}
      color={getColorByMark(mark || attendance)}
    >
      {mark ||
        (attendance ? ATTENDANCE[attendance].slice(0, 1).toUpperCase() : "")}
    </Typography>
  );
};

export default Mark;
