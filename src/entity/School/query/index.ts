import {
  ApplicationDto,
  Class,
  CreateApplication,
  CreateUserCode,
  School,
} from "@/entity/School/model";
import { baseApi } from "@/shared/api/rtkq";

export const classApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClasses: build.query<Class[], null>({
      query: () => ({
        url: "/admin-panel/class",
        method: "get",
      }),
      // @ts-ignore
      providesTags: [{ type: "getClasses", id: "LIST" }],
    }),
    createClass: build.mutation<Class, Pick<Class, "name">>({
      query: (newClass) => ({
        url: "/admin-panel/class",
        method: "post",
        data: newClass,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getClasses", id: "LIST" },
      ],
    }),

    chooseSchool: build.mutation<void, Pick<School, "id">>({
      query: (newClass) => ({
        url: "/profile/change-school",
        method: "post",
        data: newClass,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getClasses", id: "LIST" },
        // @ts-ignore
        { type: "getCalendar", id: "LIST" },
        // @ts-ignore
        { type: "getLessonsByWeek", id: "LIST" },
        // @ts-ignore
        { type: "getAnnouncements", id: "LIST" },
        // @ts-ignore
        { type: "getTeacherSubjects" },
        // @ts-ignore
        { type: "getTeachers" },
      ],
    }),

    getApplications: build.query<ApplicationDto[], null>({
      query: () => ({
        url: "/admin-panel-manager/application",
        method: "get",
      }),
      // @ts-ignore
      providesTags: [{ type: "getApplications", id: "LIST" }],
    }),
    createApplication: build.mutation<void, CreateApplication>({
      query: (newApplication) => ({
        url: "/admin-panel-manager/application",
        method: "post",
        data: newApplication,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getApplications", id: "LIST" },
      ],
    }),
    approveApplication: build.mutation<void, { id: number } & CreateUserCode>({
      query: ({ id, ...newApplication }) => ({
        url: `/admin-panel-manager/application-approve/${id}`,
        method: "post",
        data: newApplication,
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getApplications", id: "LIST" },
      ],
    }),
    rejectApplication: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/admin-panel-manager/application-reject/${id}`,
        method: "post",
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getApplications", id: "LIST" },
      ],
    }),
    recreateCodeApplication: build.mutation<
      void,
      { id: number } & CreateUserCode
    >({
      query: ({ id, ...newApplication }) => ({
        url: `/admin-panel/user-code/${id}`,
        method: "put",
        data: {
          ...newApplication,
          code: null,
        },
      }),
      invalidatesTags: [
        // @ts-ignore
        { type: "getApplications", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useChooseSchoolMutation,

  useGetApplicationsQuery,
  useCreateApplicationMutation,

  useApproveApplicationMutation,
  useRejectApplicationMutation,
  useRecreateCodeApplicationMutation,
} = classApi;
