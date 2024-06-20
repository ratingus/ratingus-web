// @ts-ignore
import { current } from "immer";

import { LESSONS_CONTEXT_PATH, LESSONS_PATH } from "../constants";
import {
  AddMarkDto,
  AddNote,
  CreateMagazineLesson,
  DayLesson,
  MagazineDto,
  MagazineLesson,
  MarkDto,
  StudentDto,
  UpdateMagazineLesson,
} from "../model";

import { AppDispatch } from "@/app/_providers/Store/config/store";
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

    getLessons: build.query<
      MagazineLesson[],
      { classId: number; teacherSubjectId: number }
    >({
      query: (params) => ({ url: "/magazine/lessons", params, method: "GET" }),
      // @ts-ignore
      providesTags: [{ type: "getLessons", id: "LIST" }],
    }),

    addMark: build.mutation<
      { studentLessonId: number; lessonId: number },
      AddMarkDto
    >({
      query: (data) => ({
        url: `/magazine/grade`,
        method: "POST",
        data,
      }),
    }),

    addLesson: build.mutation<
      void,
      CreateMagazineLesson & { classId: number; teacherSubjectId: number }
    >({
      query: ({ classId, teacherSubjectId, ...data }) => ({
        url: `/magazine/lessons`,
        method: "POST",
        params: { teacherSubjectId, classId },
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getLessons", id: "LIST" }],
    }),

    updateLesson: build.mutation<void, UpdateMagazineLesson>({
      query: (data) => ({
        url: `/magazine/lessons`,
        method: "PUT",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getLessons", id: "LIST" }],
    }),

    deleteLesson: build.mutation<void, number>({
      query: (lessonId) => ({
        url: `/magazine/lessons/${lessonId}`,
        method: "DELETE",
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getLessons", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLessonsByWeekQuery,
  useAddNoteMutation,
  useGetJournalQuery,
  useAddMarkMutation,
  useGetLessonsQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;

interface UpdateJournalCacheParams {
  index: [number, number];
  classId: number;
  teacherSubjectId: number;
  studentDto: StudentDto;
  markDto: MarkDto[];
  newMarkDto: MarkDto[];
  data: {
    studentLessonId: number;
    lessonId: number;
  };
  scheduleId: number;
}

export const updateJournalCache = (
  dispatch: AppDispatch,
  params: UpdateJournalCacheParams,
) => {
  const {
    index,
    scheduleId,
    classId,
    teacherSubjectId,
    studentDto,
    newMarkDto,
    data,
  } = params;

  dispatch(
    // @ts-ignore
    lessonsApi.util.updateQueryData(
      "getJournal",
      { classId, teacherSubjectId },
      (draft: MagazineDto) => {
        const studentIndex = current(draft).students.findIndex(
          (s: { id: number }) => s.id === studentDto.id,
        );
        const student = current(draft).students[studentIndex];
        if (student) {
          const lessonIndex = student.marks.findIndex((lessonMarks: any[]) =>
            lessonMarks.some((m) => m.lessonId === data.lessonId),
          );
          if (lessonIndex >= 0) {
            const markIndex = student.marks[lessonIndex].findIndex(
              (m: { lessonId: number }) => m.lessonId === data.lessonId,
            );
            if (markIndex >= 0) {
              draft.students[studentIndex].marks[lessonIndex][markIndex] =
                newMarkDto[0];
            }
          } else {
            draft.students[studentIndex].marks[index[0]].push(newMarkDto[0]);
            const lesson = draft.monthLessonDays[index[0]].lessonDays[
              index[1]
            ].lessonId.find(
              ({ scheduleId: schedule }) => scheduleId === schedule,
            );
            if (lesson) {
              lesson.lessonId = newMarkDto[0].lessonId;
            }
          }
        }
      },
    ),
  );
};
