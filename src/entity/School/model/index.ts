import { RoleEnum, UserIdentity } from "@/entity/User/model";

export type School = {
  id: number;
  name: string;
};

export type ProfileSchool = School & {
  role: RoleEnum;
  classDto: Class;
};

export type Class = {
  id: number;
  name: string;
};

export type CreateApplication = {
  email: string;
  name: string;
  address: string;
  phone: string;
};

export type ApplicationDto = CreateApplication & {
  id: number;
  creatorId: number;
  status: ApplicationStatus;
  code: UserCode | null;
  isActivated: boolean | null;
};

export type UserCode = Omit<UserIdentity, "id"> & {
  id: number;
  code: string;
};

export enum ApplicationStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type CreateUserCode = Omit<UserIdentity, "id">;
