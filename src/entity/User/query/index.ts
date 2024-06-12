import { getFioByUser } from "@/entity/User/helpers";
import { Profile } from "@/entity/User/model";
import { baseApi } from "@/shared/api/rtkq";
import { WithFio } from "@/shared/types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<WithFio<Profile>, null>({
      query: () => ({ url: "/profile" }),
      transformResponse: (data: Profile): WithFio<Profile> => ({
        ...data,
        fio: getFioByUser(data),
      }),
      // @ts-ignore
      providesTags: [{ type: "Profile", id: "LIST" }],
    }),

    enterCode: build.mutation<void, { code: string }>({
      query: (data) => ({
        url: `/profile/user-code`,
        method: "post",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "Profile", id: "LIST" }],
    }),
  }),
});

export const { useGetProfileQuery, useEnterCodeMutation } = profileApi;
