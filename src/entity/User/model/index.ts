import { Class, ProfileSchool } from "@/entity/School/model";

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
  birthdate: string;
};

export type User = UserDetails & {
  fio: string;
};

export type Profile = UserIdentity & {
  login: string;
  birthdate: string;
  schools: ProfileSchool[];
};

export type UserRoleDto = UserIdentity & {
  login: string;
  birthdate: string;
  school: ProfileSchool | null;
};

export type UserCodeDto = UserIdentity & {
  classDto: Class | null;
  code: string;
  role: RoleEnum;
};

export type Teacher = UserIdentity;
