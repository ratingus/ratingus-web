import { Class, School } from "@/entity/School/model";
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
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useChooseSchoolMutation,
} = classApi;
