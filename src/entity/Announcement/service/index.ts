import { ANNOUNCEMENTS_PATH } from "../constants";
import { Announcement } from "../model";

import api from "@/shared/api/axios";

const announcementsService = {
  getAnnouncements: async (classId?: number): Promise<Announcement[]> => {
    const response = await api.post(ANNOUNCEMENTS_PATH, null, {
      params: {
        class: classId,
      },
    });
    return response.data;
  },

  postAnnouncement: async (announcement: Announcement) => {
    const response = await api.post(ANNOUNCEMENTS_PATH, announcement);
    return response.data;
  },
};

export default announcementsService;
