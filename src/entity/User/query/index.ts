import { getFioByUser } from "@/entity/User/helpers";
import { Profile, UserCodeDto, UserRoleDto } from "@/entity/User/model";
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

    editProfile: build.mutation<
      void,
      {
        name: string | null;
        surname: string | null;
        patronymic: string | null;
        birthDate: Date | null;
      }
    >({
      query: (data) => ({
        url: `/profile`,
        method: "put",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "Profile", id: "LIST" }],
    }),

    getUsers: build.query<WithFio<UserRoleDto>[], null>({
      query: () => ({ url: "/admin-panel/user-role" }),
      transformResponse: (data: UserRoleDto[]): WithFio<UserRoleDto>[] =>
        data.map((item) => ({
          ...item,
          fio: getFioByUser(item),
        })),
      // @ts-ignore
      providesTags: [{ type: "getUsers", id: "LIST" }],
    }),

    getUserCodes: build.query<WithFio<UserCodeDto>[], null>({
      query: () => ({ url: "/admin-panel/user-code" }),
      transformResponse: (data: UserCodeDto[]): WithFio<UserCodeDto>[] =>
        data.map((item) => ({
          ...item,
          fio: getFioByUser(item),
        })),
      // @ts-ignore
      providesTags: [{ type: "getUserCodes", id: "LIST" }],
    }),
    createUserCode: build.mutation<void, Omit<UserCodeDto, "id" | "code">>({
      query: (data) => ({
        url: `/admin-panel/user-code`,
        method: "post",
        data,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getUserCodes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useEnterCodeMutation,
  useEditProfileMutation,

  useGetUsersQuery,
  useGetUserCodesQuery,
  useCreateUserCodeMutation,
} = profileApi;
