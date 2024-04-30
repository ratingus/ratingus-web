import React from "react";

import { ATTENDANCE } from "@/entity/AttendanceMark/constants";
import { getColorByMark } from "@/entity/AttendanceMark/helpers";
import { Lesson } from "@/entity/Lesson/model";
import { Typography } from "@/shared/components/Typography/Typography";

// import styles from './Mark.module.scss';

type MarkProps = {
  mark?: Lesson["mark"];
  attendance?: Lesson["attendance"];
};

const Mark = ({ mark, attendance }: MarkProps) => {
  if (!mark && !attendance) {
    return null;
  }
  return (
    <Typography variant="h2" color={getColorByMark(mark || attendance)}>
      {mark ||
        (attendance ? ATTENDANCE[attendance].slice(0, 1).toUpperCase() : "")}
    </Typography>
  );
};

export default Mark;
