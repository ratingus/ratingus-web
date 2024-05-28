import { Class } from "@/entity/School/model";
import { baseApi } from "@/shared/api/rtkq";

export const classApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClasses: build.query<Class[], null>({
      query: () => ({
        url: "/admin-panel/class",
        method: "get",
      }),
    }),
    createClass: build.mutation<Class, Pick<Class, "name">>({
      query: (newClass) => ({
        url: "/admin-panel/class",
        method: "post",
        data: newClass,
      }),
    }),
  }),
});

export const { useGetClassesQuery, useCreateClassMutation } = classApi;
