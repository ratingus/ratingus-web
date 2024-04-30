export type UserIdentity = {
  name: string;
  surname: string;
  patronymic?: string;
};

export type UserDetails = UserIdentity & {
  id: number;
  login: string;
  schoolId: number;
  classId: number;
  birthdate: Date;
};

export type User = UserDetails & {
  fio: string;
};

export type Teacher = UserIdentity & {
  id: number;
};
