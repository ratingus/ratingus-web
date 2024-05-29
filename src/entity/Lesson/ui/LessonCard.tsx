"use client";
import React, { ReactNode } from "react";

import { Lesson, ScheduleStudy } from "../model";

import styles from "./LessonCard.module.scss";

import { getTime } from "@/entity/Announcement/helpers";
import Mark from "@/entity/AttendanceMark/ui/Mark";
import { getFioByUser } from "@/entity/User/helpers";
import { Typography } from "@/shared/components/Typography/Typography";

type LessonCardProps = Lesson & { bottomSlot?: ReactNode };

export const LessonCard = ({ mark, attendance, ...props }: LessonCardProps) => (
  <ScheduleCard
    markSlot={<Mark mark={mark} attendance={attendance} />}
    {...props}
  />
);

type SheduleCardProps = ScheduleStudy & {
  bottomSlot?: ReactNode;
  markSlot?: ReactNode;
};

export const ScheduleCard = ({
  subject,
  teacher,
  timetableNumber,
  bottomSlot,
  markSlot,
  startTime,
  endTime,
}: SheduleCardProps) => (
  <div className={styles.main}>
    <header className={styles.header}>
      №{timetableNumber}
      <time>
        {getTime(startTime)} - {getTime(endTime)}
      </time>
    </header>
    <div className={styles.block}>
      <div className={styles.mainInfo}>
        <div className={styles.flexStart}>
          <Typography variant="h4">{subject}</Typography>
          {teacher && (
            <Typography color="textHelper" variant="caption">
              {getFioByUser(teacher)}
            </Typography>
          )}
        </div>
        {markSlot}
      </div>
      {bottomSlot}
    </div>
  </div>
);
