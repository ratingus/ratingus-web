import { createApi } from "@reduxjs/toolkit/query/react";

import { ANNOUNCEMENTS_CONTEXT_PATH } from "../constants";
import { Announcement } from "../model";

import { axiosBaseQuery } from "@/shared/api/rtkq";

export const announcementsApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: ANNOUNCEMENTS_CONTEXT_PATH,
  }),
  endpoints: (build) => ({
    getAnnouncements: build.query<Announcement[], { classId?: number }>({
      query: (params) => ({ url: "", params, method: "get" }),
    }),
  }),
});

export const { useGetAnnouncementsQuery, useLazyGetAnnouncementsQuery } =
  announcementsApi;
