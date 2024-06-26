import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import "dayjs/locale/ru";

import { capitalize } from "@/shared/helpers/strings";

dayjs.locale("ru");
dayjs.extend(isoWeek);

const daysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
export function getDayOfWeek(dayOfWeek: number): string {
  return daysOfWeek[dayOfWeek];
}

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const monthsGenitive = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export function getMonthName(month: number, genitive: boolean = false) {
  return genitive ? monthsGenitive[month] : months[month];
}

export const getDateString = (date: string, format: string) => {
  return dayjs(parseTimestamp(date)).format(format);
};
export const getDayAndMonth = (date: string, isShort?: boolean) => {
  const dateString = getDateString(date, `D MMM${isShort ? "" : "M"}`);
  const [day, month] = dateString.split(" ");
  return `${day} ${capitalize(month)}`;
};

export function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы начинаются с 0 в JavaScript
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getWeekDateBetween = (date: Date) => {
  const dateDayjs = dayjs(date);
  const startOfWeek = dayjs(date)
    .startOf("week")
    .add(dateDayjs.utcOffset() + 1, "minutes");
  const endOfWeek = dayjs(date).endOf("week");

  if (startOfWeek.month() === endOfWeek.month()) {
    return `${startOfWeek.toDate().getDate()} - ${getDayAndMonth(endOfWeek.toString(), true)}`;
  }
  return `${getDayAndMonth(startOfWeek.toString(), true)} - ${getDayAndMonth(endOfWeek.toString(), true)}`;
};

export const getDayJs = () => dayjs;

export const parseTimestamp = (data: string): Date => {
  const dateDayjs = dayjs(data);
  return dateDayjs.add(-dateDayjs.utcOffset(), "minutes").toDate();
};
export const toTimestamp = (data: string): Date => {
  const dateDayjs = dayjs(data);
  return dateDayjs.add(dateDayjs.utcOffset(), "minutes").toDate();
};
