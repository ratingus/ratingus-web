import { UserIdentity } from "../model";

import { getDateString } from "@/shared/helpers/date";

export const getUserBirthdate = (birthdate: Date) =>
  getDateString(birthdate, "DD MMMM YYYY");

export const getFioByUser = (
  user: Pick<UserIdentity, "name" | "surname" | "patronymic">,
) => {
  const { surname, name, patronymic } = user;
  return `${surname} ${name} ${patronymic}`;
};

export const getFiByUser = (user: UserIdentity) => {
  const { surname, name } = user;
  return `${surname} ${name}`;
};
