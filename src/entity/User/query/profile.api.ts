import { getFioByUser } from "@/entity/User/helpers";
import { Profile } from "@/entity/User/model";
import { baseApi } from "@/shared/api/rtkq";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<Profile & { fio: string }, null>({
      query: () => ({ url: "/profile" }),
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
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
