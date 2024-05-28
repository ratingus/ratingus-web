import { createApi } from "@reduxjs/toolkit/query/react";

import { getFioByUser } from "@/entity/User/helpers";
import { Profile } from "@/entity/User/model";
import { axiosBaseQuery } from "@/shared/api/rtkq";

export const profileApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "/profile",
  }),
  tagTypes: ["Profile"],
  endpoints: (build) => ({
    getProfile: build.query<Profile & { fio: string }, null>({
      query: () => ({ url: "" }),
      transformResponse(data: Profile): Profile & { fio: string } {
        console.log(data);
        return {
          ...data,
          fio: getFioByUser({
            name: data.name,
            surname: data.surname,
            patronymic: data.patronymic,
          }),
        };
      },
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
