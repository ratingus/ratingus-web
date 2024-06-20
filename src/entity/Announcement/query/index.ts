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
    postAnnouncement: build.mutation<
      Announcement,
      CreateAnnouncementDto & { classId?: number }
    >({
      query: ({ classId, ...newAnnouncement }) => ({
        url: ANNOUNCEMENTS_CONTEXT_PATH,
        method: "post",
        data: newAnnouncement,
      }),
      async onQueryStarted(
        { classId, ...newAnnouncement },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data: createdAnnouncement } = await queryFulfilled;
          dispatch(
            announcementsApi.util.updateQueryData(
              "getAnnouncements",
              { classId },
              (draft) => {
                draft.unshift({
                  ...createdAnnouncement,
                  creator: {
                    ...createdAnnouncement.creator,
                    fio: getFioByUser(createdAnnouncement.creator),
                  },
                });
              },
            ),
          );
        } catch {}
      },
    }),
    deleteAnnouncement: build.mutation<void, { classId?: number; id: number }>({
      query: ({ id }) => ({
        url: `${ANNOUNCEMENTS_CONTEXT_PATH}/${id}`,
        method: "delete",
      }),
      async onQueryStarted({ classId, id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          announcementsApi.util.updateQueryData(
            "getAnnouncements",
            { classId },
            (draft) => {
              return draft.filter((announcement) => announcement.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          // handle error
        }
      },
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useLazyGetAnnouncementsQuery,
  usePostAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementsApi;
