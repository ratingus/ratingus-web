import { getDateString } from "@/shared/helpers/date";

export const getDateTime = (date: Date) => getDateString(date, "D MMM HH:mm");

export const getTime = (date: Date) => getDateString(date, "H:mm");
