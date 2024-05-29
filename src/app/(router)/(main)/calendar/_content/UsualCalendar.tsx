import React from "react";
import cl from "classnames";

import styles from "@/app/(router)/(main)/calendar/page.module.scss";
import { ScheduleCard } from "@/entity/Lesson/ui/LessonCard";
import { ScheduleDay } from "@/entity/Schedule/model";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDayOfWeek } from "@/shared/helpers/date";

type UsualCalendarProps = {
  lessonsByWeek: ScheduleDay[];
};

export const UsualCalendar = ({ lessonsByWeek }: UsualCalendarProps) => {
  return (
    <div className={cl(styles.calendar, styles.card)}>
      {lessonsByWeek.map((dayLesson) => (
        <div
          key={dayLesson.dayOfWeek}
          className={cl(styles.card, styles.dayLesson)}
        >
          <Typography variant="h4">
            {getDayOfWeek(dayLesson.dayOfWeek)}
          </Typography>
          <div className={styles.lessons}>
            {dayLesson.studies.map((lesson) => (
              <div key={lesson.timetableNumber}>
                <ScheduleCard {...lesson} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
