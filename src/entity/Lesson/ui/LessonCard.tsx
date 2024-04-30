"use client";
import React, { ReactNode } from "react";

import { Lesson } from "../model";

import styles from "./LessonCard.module.scss";

import Mark from "@/entity/AttendanceMark/ui/Mark";
import { getFioByUser } from "@/entity/User/helpers";
import { Typography } from "@/shared/components/Typography/Typography";

type LessonCardProps = Lesson & { bottomSlot?: ReactNode };

const LessonCard = ({
  id,
  mark,
  studyId,
  subject,
  teacher,
  timetableNumber,
  attendance,
  bottomSlot,
}: LessonCardProps) => {
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        №{timetableNumber}
        {/* TODO: обработка времени */}
        <time>8:00 - 8:40</time>
      </header>
      <div className={styles.block}>
        <div className={styles.mainInfo}>
          <div className={styles.flexStart}>
            <Typography variant="h4">{subject}</Typography>
            <Typography color="textHelper" variant="caption">
              {getFioByUser(teacher)}
            </Typography>
          </div>
          <Mark mark={mark} attendance={attendance} />
        </div>
        {bottomSlot}
      </div>
    </div>
  );
};

export default LessonCard;
