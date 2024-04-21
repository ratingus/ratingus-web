export type UserDetails = {
  id: number;
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  schoolId: number;
  classId: number;
  birthdate: Date;
};

export type User = UserDetails & {
  fio: string;
};
