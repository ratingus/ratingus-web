import { Attendance } from "@/entity/AttendanceMark/model";
import { Study } from "@/entity/Study/model";

export type DayLesson = {
  dateTime: Date;
  studies: Lesson[];
};

export type Lesson = Study & {
  id: number;
  mark?: string;
  attendance?: Attendance;
};

export type DayLessonDetailed = {
  dateTime: Date;
  studies: LessonDetailed[];
};

export type LessonDetailed = Lesson & {
  homework?: string;
  note?: string;
};
