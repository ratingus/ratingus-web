import { LESSONS_CONTEXT_PATH } from "../constants";
import { DayLesson, Lesson } from "../model";

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
  }),
});

export const {
  useGetLessonsByWeekQuery,
  useGetLessonsByDayQuery,
  useGetLessonByIdQuery,
} = lessonsApi;
