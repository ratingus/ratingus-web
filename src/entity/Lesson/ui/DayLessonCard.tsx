"use client";
import React from "react";
import { useRouter } from "next/navigation";

import styles from "./DayLessonCard.module.scss";

import { DayLesson } from "@/entity/Lesson/model";
import { Typography } from "@/shared/components/Typography/Typography";
import {
  getDateString,
  getDayAndMonth,
  parseTimestamp,
} from "@/shared/helpers/date";
import { capitalize } from "@/shared/helpers/strings";
import DiaryLessonCard from "@/widget/DiaryLessonCard/DiaryLessonCard";

type DayLessonCardProps = DayLesson;

const DayLessonCard = ({ dateTime, studies }: DayLessonCardProps) => {
  const router = useRouter();

  // TODO: перенести в /feature
  const handleDateClick = () => {
    // const week = getWeekNumber(dateTime);
    const week = 35;
    const day = parseTimestamp(dateTime).getDay();

    router.push("/diary?week=" + week + "&day=" + day);
  };

  return (
    <div className={styles.main}>
      <header className={styles.block} onClick={handleDateClick}>
        <Typography variant="h4">
          {capitalize(getDateString(dateTime, "dddd"))}
        </Typography>
        <time>{getDayAndMonth(dateTime)}</time>
      </header>
      <div className={styles.lessons}>
        {studies.map((lesson) => (
          //   @ts-ignore
          <DiaryLessonCard key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
};

export default DayLessonCard;
