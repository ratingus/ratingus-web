import { default as announcementHandlers } from "@/entity/Announcement/mock";
import { authHandler } from "@/entity/Auth";

export const handlers = [authHandler, ...announcementHandlers];
