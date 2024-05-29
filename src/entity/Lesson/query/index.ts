import { LESSONS_CONTEXT_PATH } from "../constants";
import { DayLesson, Lesson, ScheduleDay } from "../model";

import { baseApi } from "@/shared/api/rtkq";

export const lessonsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessonsByWeek: build.query<DayLesson[], { week: number }>({
      query: (params) => ({ url: LESSONS_CONTEXT_PATH, params, method: "get" }),
    }),
    getLessonsByDay: build.query<DayLesson, { week: number; day: number }>({
      query: (params) => ({ url: LESSONS_CONTEXT_PATH, params, method: "get" }),
    }),
    getLessonById: build.query<Lesson, { id: number }>({
      query: (params) => ({ url: LESSONS_CONTEXT_PATH, params, method: "get" }),
    }),

    getCalendar: build.query<ScheduleDay[], { classId: number }>({
      query: ({ classId }) => ({ url: `/schedule/${classId}`, method: "get" }),
      transformResponse: (data: { dayLessons: ScheduleDay[] }): ScheduleDay[] =>
        data.dayLessons,
    }),
  }),
});

export const {
  useGetLessonsByWeekQuery,
  useGetLessonsByDayQuery,
  useGetLessonByIdQuery,
  useGetCalendarQuery,
} = lessonsApi;
