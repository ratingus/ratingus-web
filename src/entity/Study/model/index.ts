import { Teacher } from "@/entity/User/model";

export type Study = {
  studyId: number;
  timetableNumber: number;
  subject: string;
  teacher: Teacher;
};
