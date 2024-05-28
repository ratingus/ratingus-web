import { ANNOUNCEMENTS_CONTEXT_PATH } from "../constants";
import { Announcement, BaseAnnouncement } from "../model";

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
    }),
  }),
});

export const { useGetAnnouncementsQuery, useLazyGetAnnouncementsQuery } =
  announcementsApi;
