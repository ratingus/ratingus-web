import { Attendance } from "@/entity/AttendanceMark/model";
import vars from "@/shared/styles/vars.module.scss";

export const getColorByMark = (
  mark?: string | Attendance,
): keyof typeof vars => {
  switch (mark) {
    case "5":
      return "statusSuccess";
    case "4":
      return "statusInfo";
    case "3":
      return "statusCaution";
    case "2":
    case "1":
      return "statusWarning";
    default:
      return "textHelper";
  }
};
