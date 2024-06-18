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
      providesTags: () => [{ type: "getCalendar", id: "LIST" }],
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
        { type: "getCalendar" },
      ],
    }),
    changeTeacherSubjectInCalendar: build.mutation<
      void,
      { data: ChangeTeacherSubjectsInCalendarDto; classId: number }
    >({
      query: ({ data, classId }) => ({
        url: `/schedule/${classId}`,
        method: "PATCH",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [
        // @ts-ignore
        { type: "getCalendar" },
      ],
    }),
    deleteTeacherSubjectInCalendar: build.mutation<
      void,
      { data: DeleteTeacherSubjectInCalendarDto; classId: number }
    >({
      query: ({ data, classId }) => ({
        url: `/schedule/${classId}`,
        method: "DELETE",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [
        // @ts-ignore
        { type: "getCalendar", id: "LIST" },
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
              { type: "getTeachers", id: "LIST" },
            ]
          : [{ type: "getTeachers", id: "LIST" }],
    }),
    getTeacherSubjects: build.query<TeacherSubjects[], null>({
      query: () => ({ url: `/admin-panel/subject`, method: "get" }),
      // @ts-ignore
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ subject: { id }, teachers }) => ({
                type: "getTeacherSubjects",
                id: `${id}-${teachers ? teachers.join("+") : null}`,
              })),
              { type: "getTeacherSubjects", id: "LIST" },
            ]
          : [{ type: "getTeacherSubjects", id: "LIST" }],
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
        id: teacherSubjectId,
        subject,
        teacher,
      }: TeacherSubjectDto): TeacherSubject => ({
        subject,
        teacher: { ...teacher, teacherSubjectId },
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getTeacherSubjects" },
        // @ts-ignore
        { type: "getTeachers" },
      ],
    }),
    addSubject: build.mutation<void, { name: string }>({
      query: (newTeacherSubject) => ({
        url: "/admin-panel/subject",
        method: "post",
        data: newTeacherSubject,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getTeacherSubjects" },
      ],
    }),
    updateSubject: build.mutation<void, { id: number; name: string }>({
      query: ({ id, ...newTeacherSubject }) => ({
        url: `/admin-panel/subject/${id}`,
        method: "put",
        data: newTeacherSubject,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getTeacherSubjects" },
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
  useAddSubjectMutation,
  useUpdateSubjectMutation,
} = scheduleApi;
