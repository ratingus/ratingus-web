import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { selectState } from "../slice";

export const selectDayLessonsByWeek = (week: number) =>
  createDraftSafeSelector([selectState], (state) => state.dayLessons[week]);

export const selectDayLessonByDay = (week: number, day: number) =>
  createDraftSafeSelector([selectDayLessonsByWeek(week)], (dayLessons) => {
    const dayLesson = dayLessons.find(
      (dayLesson) => dayLesson.dateTime.getDay() === day,
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
