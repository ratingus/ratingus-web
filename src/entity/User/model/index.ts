export type UserDetails = {
  id: number;
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  birthdate: Date;
};

export type User = UserDetails & {
  fio: string;
};
