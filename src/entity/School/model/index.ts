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
