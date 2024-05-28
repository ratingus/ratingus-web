import { ANNOUNCEMENTS_CONTEXT_PATH } from "../constants";
import { Announcement } from "../model";

import { baseApi } from "@/shared/api/rtkq";

export const announcementsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnnouncements: build.query<Announcement[], { classId?: number }>({
      query: (params) => ({
        url: ANNOUNCEMENTS_CONTEXT_PATH,
        params,
        method: "get",
      }),
      transformResponse(data: Announcement[]): Announcement[] {
        console.log(data);
        return data;
      },
    }),
  }),
});

export const { useGetAnnouncementsQuery, useLazyGetAnnouncementsQuery } =
  announcementsApi;
