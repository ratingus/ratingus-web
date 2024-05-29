import {
  AddTeacherSubjectInCalendarDto,
  ChangeTeacherSubjectsInCalendarDto,
  DeleteTeacherSubjectInCalendarDto,
  ScheduleDay,
  TeacherSubject,
  TeacherSubjectDto,
  TeacherSubjects,
} from "@/entity/Schedule/model";
import { Teacher } from "@/entity/User/model";
import { baseApi } from "@/shared/api/rtkq";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCalendar: build.query<
      ScheduleDay[],
      { classId: number; isAllDay?: boolean }
    >({
      query: ({ classId, isAllDay }) => ({
        url: `/schedule/${classId}`,
        params: { isAllDay },
        method: "get",
      }),
      transformResponse: (data: { dayLessons: ScheduleDay[] }): ScheduleDay[] =>
        data.dayLessons,
      // @ts-ignore
      providesTags: () => [{ type: "Schedule", id: "LIST" }],
    }),
    addTeacherSubjectInCalendar: build.mutation<
      void,
      { data: AddTeacherSubjectInCalendarDto; classId: number }
    >({
      query: ({ data, classId }) => ({
        url: `/schedule/${classId}`,
        method: "POST",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [
        // @ts-ignore
        { type: "Schedule" },
      ],
    }),
    changeTeacherSubjectInCalendar: build.mutation<
      void,
      { data: ChangeTeacherSubjectsInCalendarDto; classId: number }
    >({
      query: ({ data, classId }) => ({
        url: `/schedule/change/${classId}`,
        method: "POST",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [
        // @ts-ignore
        { type: "Schedule" },
      ],
    }),
    deleteTeacherSubjectInCalendar: build.mutation<
      void,
      { data: DeleteTeacherSubjectInCalendarDto; classId: number }
    >({
      query: ({ data, classId }) => ({
        url: `/schedule/delete/${classId}`,
        method: "POST",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [
        // @ts-ignore
        { type: "Schedule" },
      ],
    }),

    getTeachers: build.query<Teacher[], null>({
      query: () => ({ url: "/admin-panel/teacher", method: "get" }),
      // @ts-ignore
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Teachers",
                id,
              })),
              { type: "Teachers", id: "LIST" },
            ]
          : [{ type: "Teachers", id: "LIST" }],
    }),
    getTeacherSubjects: build.query<TeacherSubjects[], null>({
      query: () => ({ url: `/admin-panel/subject`, method: "get" }),
      // @ts-ignore
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ subject: { id }, teachers }) => ({
                type: "TeacherSubject",
                id: `${id}-${teachers ? teachers.join("+") : null}`,
              })),
              { type: "TeacherSubject", id: "LIST" },
            ]
          : [{ type: "TeacherSubject", id: "LIST" }],
    }),
    addTeacherSubject: build.mutation<
      TeacherSubject,
      { subjId: string; teacherId: string }
    >({
      query: (newTeacherSubject) => ({
        url: "/admin-panel/subject-teacher",
        method: "post",
        data: newTeacherSubject,
      }),
      transformResponse: ({
        id: subjectTeacherId,
        subject,
        teacher,
      }: TeacherSubjectDto): TeacherSubject => ({
        subject,
        teacher: { ...teacher, subjectTeacherId },
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "TeacherSubject" },
        // @ts-ignore
        { type: "Teachers" },
      ],
    }),
  }),
});

export const {
  useGetCalendarQuery,
  useAddTeacherSubjectInCalendarMutation,
  useChangeTeacherSubjectInCalendarMutation,
  useDeleteTeacherSubjectInCalendarMutation,

  useGetTeachersQuery,
  useGetTeacherSubjectsQuery,
  useAddTeacherSubjectMutation,
} = scheduleApi;
