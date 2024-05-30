import { ANNOUNCEMENTS_CONTEXT_PATH } from "../constants";
import {
  Announcement,
  BaseAnnouncement,
  CreateAnnouncementDto,
} from "../model";

import { getFioByUser } from "@/entity/User/helpers";
import { baseApi } from "@/shared/api/rtkq";

export const announcementsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnnouncements: build.query<Announcement[], { classId?: number }>({
      query: (params) => ({
        url: ANNOUNCEMENTS_CONTEXT_PATH,
        params,
        method: "get",
      }),
      transformResponse: (data: BaseAnnouncement[]): Announcement[] =>
        data.map((announcement) => ({
          ...announcement,
          creator: {
            ...announcement.creator,
            fio: getFioByUser(announcement.creator),
          },
        })),
      // @ts-ignore TODO: RATINGUS-274 https://ratingus.youtrack.cloud/issue/RATINGUS-274/ts-ignore-iz-za-providesTags-i-invalidatesTags
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Announcement", id })),
              { type: "getAnnouncements", id: "LIST" },
            ]
          : [{ type: "getAnnouncements", id: "LIST" }],
    }),
    postAnnouncement: build.mutation<Announcement, CreateAnnouncementDto>({
      query: (newAnnouncement) => ({
        url: ANNOUNCEMENTS_CONTEXT_PATH,
        method: "post",
        data: newAnnouncement,
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "getAnnouncements", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useLazyGetAnnouncementsQuery,
  usePostAnnouncementMutation,
} = announcementsApi;
