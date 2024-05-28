import { ProfileSchool } from "@/entity/School/model";

export type UserIdentity = {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
};

export enum RoleEnum {
  GUEST = "GUEST",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  LOCAL_ADMIN = "LOCAL_ADMIN",
  MANAGER = "MANAGER",
}

export type UserDetails = UserIdentity & {
  login: string;
  role: RoleEnum;
  schoolId: number;
  classId: number;
  birthdate: Date;
};

export type User = UserDetails & {
  fio: string;
};

export type Profile = {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
  login: string;
  birthdate: Date;
  schools: ProfileSchool[];
};

export type Teacher = UserIdentity;
