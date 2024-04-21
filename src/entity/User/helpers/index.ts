import { UserDetails } from "../model";

import { getDateString } from "@/shared/helpers/date";

export const getUserBirthdate = (birthdate: Date) =>
  getDateString(birthdate, "DD MMMM YYYY");

export const getFioByUser = (user: UserDetails) => {
  const { surname, name, patronymic } = user;
  return `${surname} ${name} ${patronymic}`;
};
