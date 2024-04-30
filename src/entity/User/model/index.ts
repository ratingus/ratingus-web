export type UserIdentity = {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
};

export type UserDetails = UserIdentity & {
  login: string;
  schoolId: number;
  classId: number;
  birthdate: Date;
};

export type User = UserDetails & {
  fio: string;
};

export type Teacher = UserIdentity;
