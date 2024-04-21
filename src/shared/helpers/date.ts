import dayjs from "dayjs";

import "dayjs/locale/ru";

dayjs.locale("ru");

export const getDateString = (date: Date, format: string) => {
  return dayjs(date).format(format);
};
