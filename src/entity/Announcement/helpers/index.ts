import { getDateString } from "@/shared/helpers/date";

export const getDateTime = (date: string) => getDateString(date, "D MMM HH:mm");

export const getTime = (date: string) => getDateString(date, "H:mm");
