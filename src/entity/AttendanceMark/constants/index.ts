import { Attendance } from "../model";

export const ATTENDANCE: { [key in Attendance]: string } = {
  was: "Был",
  validAbsent: "Уважительная причина",
  invalidAbsent: "Неуважительная причина",
};
