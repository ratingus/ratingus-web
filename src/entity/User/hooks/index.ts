import { getFioByUser } from "@/entity/User/helpers";
import { User, UserDetails } from "@/entity/User/model";

export const useUser = (): User => {
  // TODO: обработка jwt
  const user: UserDetails = {
    id: 1,
    login: "Логин",
    name: "Имя",
    surname: "Фамилия",
    patronymic: "Отчество",
    schoolId: 1,
    classId: 1,
    birthdate: new Date(Date.UTC(2002, 2, 12)),
  };
  return {
    ...user,
    fio: getFioByUser(user),
  };
};
