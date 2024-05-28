import { ANNOUNCEMENTS_PATH } from "../constants";
import { BaseAnnouncement } from "../model";

import api from "@/shared/api/axios";

const announcementsService = {
  getAnnouncements: async (classId?: number): Promise<BaseAnnouncement[]> => {
    const response = await api.post(ANNOUNCEMENTS_PATH, null, {
      params: {
        class: classId,
      },
    });
    return response.data;
  },

  postAnnouncement: async (announcement: BaseAnnouncement) => {
    const response = await api.post(ANNOUNCEMENTS_PATH, announcement);
    return response.data;
  },
};

export default announcementsService;
