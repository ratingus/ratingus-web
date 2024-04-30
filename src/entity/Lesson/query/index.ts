import { createApi } from "@reduxjs/toolkit/query/react";

import { LESSONS_CONTEXT_PATH } from "../constants";
import { DayLesson, Lesson } from "../model";

import { axiosBaseQuery } from "@/shared/api/rtkq";

export const lessonsApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: LESSONS_CONTEXT_PATH,
  }),
  endpoints: (build) => ({
    getLessonsByWeek: build.query<DayLesson[], { week: number }>({
      query: (params) => ({ url: "", params, method: "get" }),
    }),
    getLessonsByDay: build.query<DayLesson, { week: number; day: number }>({
      query: (params) => ({ url: "", params, method: "get" }),
    }),
    getLessonById: build.query<Lesson, { id: number }>({
      query: (params) => ({ url: "", params, method: "get" }),
    }),
  }),
});

export const {
  useGetLessonsByWeekQuery,
  useGetLessonsByDayQuery,
  useGetLessonByIdQuery,
} = lessonsApi;
