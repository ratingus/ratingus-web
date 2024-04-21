import { User } from "../model";

import { getDateString } from "@/shared/helpers/date";

export const getUserBirthdate = (birthdate: Date) =>
  getDateString(birthdate, "DD MMMM YYYY");

export const getFioByUser = (user: User) => {
  const { surname, name, patronymic } = user;
  return `${surname} ${name} ${patronymic}`;
};
