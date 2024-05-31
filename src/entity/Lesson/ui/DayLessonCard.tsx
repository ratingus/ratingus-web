"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./DayLessonCard.module.scss";

import { DayLesson } from "@/entity/Lesson/model";
import { Typography } from "@/shared/components/Typography/Typography";
import {
  getDateString,
  getDayAndMonth,
  parseTimestamp,
} from "@/shared/helpers/date";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { capitalize } from "@/shared/helpers/strings";
import DiaryLessonCard from "@/widget/DiaryLessonCard/DiaryLessonCard";

type DayLessonCardProps = DayLesson;

const DayLessonCard = ({ dateTime, studies }: DayLessonCardProps) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const day = parseTimestamp(dateTime).getDay();

  // TODO: перенести в /feature
  const handleDateClick = () => {
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "day", value: day }, { name: "lesson", value: undefined })}`,
    );
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
          <DiaryLessonCard key={lesson.id} day={day} {...lesson} />
        ))}
      </div>
    </div>
  );
};

export default DayLessonCard;
