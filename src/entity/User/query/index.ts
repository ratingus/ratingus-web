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
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
