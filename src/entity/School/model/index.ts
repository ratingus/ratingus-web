import { RoleEnum } from "@/entity/User/model";

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
  code: string;
};

export enum ApplicationStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
