import { Attendance } from "../model";

export const ATTENDANCE: { [key in Attendance]: string } = {
  late: "Опоздал",
  validAbsent: "Уважительная причина",
  invalidAbsent: "Неуважительная причина",
};
