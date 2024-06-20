import { Teacher } from "@/entity/User/model";

export type ScheduleDay = {
  dayOfWeek: number;
  studies: ScheduleStudy[];
};

export type ScheduleStudy = {
  timetableNumber: number;
  teacherSubjectId: number;
  subject: string;
  teacher: Teacher | null;
  startTime: string;
  endTime: string;
};

export type TeacherSubjectDto = {
  id: number;
  subject: {
    id: number;
    name: string;
  };
  teacher: Teacher;
};

export type TeacherSubject = {
  subject: {
    id: number;
    name: string;
  };
  teacher: TeacherWithSubject;
};

export type TeacherSubjects = {
  subject: {
    id: number;
    name: string;
  };
  teachers: TeacherWithSubject[] | null;
};

export type TeacherWithSubject = Teacher & { teacherSubjectId: number };

export type AddTeacherSubjectInCalendarDto =
  DeleteTeacherSubjectInCalendarDto & {
    studyWithTeacherId: number;
  };
export type ChangeTeacherSubjectsInCalendarDto = {
  from: DeleteTeacherSubjectInCalendarDto;
  to: DeleteTeacherSubjectInCalendarDto;
};
export type DeleteTeacherSubjectInCalendarDto = {
  lessonNumber: number;
  dayOfWeek: number;
};
