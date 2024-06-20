import { Attendance } from "@/entity/AttendanceMark/model";
import vars from "@/shared/styles/vars.module.scss";

export const getColorByMark = (
  mark?: string | Attendance,
): keyof typeof vars => {
  const markValue = Number(mark);
  if (markValue >= 4.5) return "statusSuccess";
  if (markValue >= 3.5) return "statusInfo";
  if (markValue >= 2.5) return "statusCaution";
  if (markValue >= 0) return "statusWarning";
  return "textHelper";
};
