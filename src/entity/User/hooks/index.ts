import { getFioByUser } from "@/entity/User/helpers";
import { User } from "@/entity/User/model";

export const useUser = (): User => {
  // TODO: обработка jwt
  const user = {
    id: 1,
    login: "Логин",
    name: "Имя",
    surname: "Фамилия",
    patronymic: "Отчество",
    fio: "",
    birthdate: new Date(Date.UTC(2002, 2, 12)),
  };
  return {
    ...user,
    fio: getFioByUser(user),
  };
};
