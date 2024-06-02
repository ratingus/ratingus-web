import { LESSONS_CONTEXT_PATH, LESSONS_PATH } from "../constants";
import { AddNote, DayLesson, MagazineDto } from "../model";

import { baseApi } from "@/shared/api/rtkq";

export const lessonsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLessonsByWeek: build.query<DayLesson[], { week: number }>({
      query: (params) => ({ url: LESSONS_PATH, params, method: "get" }),
      // @ts-ignore
      providesTags: [{ type: "getLessonsByWeek", id: "LIST" }],
    }),

    addNote: build.mutation<void, AddNote>({
      query: (data) => ({
        url: `${LESSONS_CONTEXT_PATH}/lesson`,
        method: "post",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getLessonsByWeek", id: "LIST" }],
    }),

    getJournal: build.query<
      MagazineDto,
      { classId: number; teacherSubjectId: number }
    >({
      query: (params) => ({ url: "/magazine/users", params, method: "get" }),
    }),
  }),
});

export const {
  useGetLessonsByWeekQuery,
  useAddNoteMutation,
  useGetJournalQuery,
} = lessonsApi;
