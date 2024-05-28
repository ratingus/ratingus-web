import { RoleEnum, UserIdentity } from "../model";

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

export const getRoleByType = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.GUEST:
      return "Гость";
    case RoleEnum.STUDENT:
      return "Ученик";
    case RoleEnum.TEACHER:
      return "Учитель";
    case RoleEnum.LOCAL_ADMIN:
      return "Администратор";
    case RoleEnum.MANAGER:
      return "Менеджер";
    default:
      return "";
  }
};
