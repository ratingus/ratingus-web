import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { selectState } from "../slice";

import { parseTimestamp } from "@/shared/helpers/date";

export const selectDayLessonsByWeek = (week: number) =>
  createDraftSafeSelector([selectState], (state) => state.dayLessons[week]);

export const selectDayLessonByDay = (week: number, day: number) =>
  createDraftSafeSelector([selectDayLessonsByWeek(week)], (dayLessons) => {
    const dayLesson = dayLessons.find(
      (dayLesson) => parseTimestamp(dayLesson.dateTime).getDay() === day,
    );
    if (!dayLesson) {
      return null;
    }
    return dayLesson;
  });

export const selectLesson = (week: number, day: number, timetable: number) =>
  createDraftSafeSelector([selectDayLessonByDay(week, day)], (dayLesson) =>
    dayLesson ? dayLesson.studies[timetable - 1] : null,
  );
