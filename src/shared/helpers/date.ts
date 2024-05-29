import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import "dayjs/locale/ru";

import { capitalize } from "@/shared/helpers/strings";

dayjs.locale("ru");
dayjs.extend(isoWeek);

export function getDayOfWeek(dayOfWeek: number): string {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  return daysOfWeek[dayOfWeek];
}

export const getDateString = (date: Date, format: string) => {
  return dayjs(date).format(format);
};
export const getDayAndMonth = (date: Date, isShort?: boolean) => {
  const dateString = getDateString(date, `D MMM${isShort ? "" : "M"}`);
  const [day, month] = dateString.split(" ");
  return `${day} ${capitalize(month)}`;
};

export const getDayJs = () => dayjs;
