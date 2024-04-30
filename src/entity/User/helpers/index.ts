import { UserIdentity } from "../model";

import { getDateString } from "@/shared/helpers/date";

export const getUserBirthdate = (birthdate: Date) =>
  getDateString(birthdate, "DD MMMM YYYY");

export const getFioByUser = (user: UserIdentity) => {
  const { surname, name, patronymic } = user;
  return `${surname} ${name} ${patronymic}`;
};
