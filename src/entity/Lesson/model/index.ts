import { Attendance } from "@/entity/AttendanceMark/model";
import { UserDetails } from "@/entity/User/model";

export type DayLesson = {
  dayOfWeek: number;
  dateTime: string;
  studies: Lesson[];
};

export type Lesson = {
  scheduleId: number;
  lessonId: number;
  studentLessonId: number;
  teacherSubjectId: number;
  subject: string;
  teacher: UserDetails;
  timetableNumber: number;
  mark?: string;
  attendance?: Attendance;
  homework: string;
  note: string;
  startTime: string;
  endTime: string;
};

export type DayLessonDetailed = {
  dateTime: string;
  studies: LessonDetailed[];
};

export type LessonDetailed = Lesson & {
  homework?: string;
  note?: string;
};

export type AddNote = {
  scheduleId: number;
  date: Date;
  lessonId: number;
  lessonStudentId: number;
  text: string;
};
