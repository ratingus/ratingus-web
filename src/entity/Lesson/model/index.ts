import { Attendance } from "@/entity/AttendanceMark/model";
import { Teacher, UserDetails } from "@/entity/User/model";

export type ScheduleDay = {
  dayOfWeek: number;
  studies: ScheduleStudy[];
};

export type ScheduleStudy = {
  timetableNumber: number;
  teacherSubjectId: number;
  subject: string;
  teacher: Teacher | null;
  startTime: Date;
  endTime: Date;
};

export type DayLesson = {
  dayOfWeek: number;
  dateTime: Date;
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
  startTime: Date;
  endTime: Date;
};

export type DayLessonDetailed = {
  dateTime: Date;
  studies: LessonDetailed[];
};

export type LessonDetailed = Lesson & {
  homework?: string;
  note?: string;
};
