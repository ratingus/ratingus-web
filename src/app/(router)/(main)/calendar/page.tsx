"use client";
import React from "react";
import cl from "classnames";

import styles from "./page.module.scss";

import { generateDayLesson } from "@/entity/Lesson/mock";
import LessonCard from "@/entity/Lesson/ui/LessonCard";
import { classes } from "@/entity/School/mock";
import { useUser } from "@/entity/User/hooks";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDateString } from "@/shared/helpers/date";
import { capitalize } from "@/shared/helpers/strings";

export default function Calendar() {
  const lessonsByWeek = Array(6)
    .fill([])
    .map((_, i) => generateDayLesson(i + 1));
  const currentUser = useUser();
  const options = classes.map(({ name }) => ({ label: name, value: name }));
  const currentClass = classes.find(({ id }) => id === currentUser.classId);
  return (
    <PageContainer isPanel className={styles.base}>
      <div>
        <Typography variant="h4">Класс</Typography>
        <Select
          variant="dark"
          // @ts-ignore
          defaultValue={
            currentClass
              ? { label: currentClass.name, value: currentClass.name }
              : undefined
          }
          options={options}
        />
      </div>
      <div className={cl(styles.calendar, styles.card)}>
        {lessonsByWeek.map((dayLesson) => (
          <div
            key={dayLesson.dateTime.getDay()}
            className={cl(styles.card, styles.dayLesson)}
          >
            <Typography variant="h4">
              {capitalize(getDateString(dayLesson.dateTime, "dddd"))}
            </Typography>
            <div className={styles.lessons}>
              {dayLesson.studies.map((lesson) => (
                <LessonCard key={lesson.timetableNumber} {...lesson} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
