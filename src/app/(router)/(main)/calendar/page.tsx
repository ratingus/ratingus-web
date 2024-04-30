import React from "react";
import cl from "classnames";

import styles from "./page.module.scss";

import { generateDayLesson } from "@/entity/Lesson/mock";
import LessonCard from "@/entity/Lesson/ui/LessonCard";
import ClassSelector from "@/feature/ClassSelector/ClassSelector";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDateString } from "@/shared/helpers/date";
import { capitalize } from "@/shared/helpers/strings";

export default function Calendar() {
  const lessonsByWeek = Array(6)
    .fill([])
    .map((_, i) => generateDayLesson(i + 1));

  return (
    <PageContainer isPanel className={styles.base}>
      <ClassSelector />
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
