import React, { useEffect, useMemo, useState } from "react";
import cl from "classnames";

import styles from "./StudentsTable.module.scss";

import Mark from "@/entity/AttendanceMark/ui/Mark";
import { MagazineLessonDto, MarkDto, StudentDto } from "@/entity/Lesson/model";
import { selectSelectedStudentTeacher } from "@/entity/Lesson/store/journal/selectors";
import { actionSetSelectedStudentTeacher } from "@/entity/Lesson/store/journal/slice";
import Button from "@/shared/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";

export type StudentsTableMarkProps = {
  lessonId: MagazineLessonDto[];
  markDto: MarkDto[];
  studentDto: StudentDto;
  date: string;
  index: [number, number];
};

export const StudentsTableMark = (
  props: StudentsTableMarkProps & {
    isEditing: boolean;
  },
) => {
  const { lessonId, studentDto, markDto, isEditing, date } = props;
  const { mark, attendance } = markDto[0] || {
    mark: undefined,
    attendance: undefined,
  };
  const [markValue, setMarkValue] = useState(mark);
  const [attendanceValue, setAttendanceValue] = useState(attendance);

  const id = Object.values({
    ...(lessonId?.[0] || {
      scheduleId: null,
      lessonNumber: null,
      lessonId: null,
    }),
    studentLessonId: studentDto.id,
    date,
  })?.join("-");

  const selectedStudentLesson = useAppSelector(selectSelectedStudentTeacher);
  const isSelected = useMemo(() => {
    const selectedId = Object.values({
      ...(selectedStudentLesson?.lessonId?.[0] || {
        scheduleId: null,
        lessonNumber: null,
        lessonId: null,
      }),
      studentLessonId: selectedStudentLesson?.studentDto?.id,
      date: selectedStudentLesson?.date,
    })?.join("-");
    return id === selectedId;
  }, [
    id,
    selectedStudentLesson?.date,
    selectedStudentLesson?.lessonId,
    selectedStudentLesson?.studentDto?.id,
  ]);

  useEffect(() => {
    if (isSelected) {
      const { mark, attendance } = selectedStudentLesson?.markDto[0] || {
        mark: undefined,
        attendance: undefined,
      };
      setMarkValue(mark);
      setAttendanceValue(attendance);
    }
  }, [isSelected, selectedStudentLesson?.markDto]);

  const dispatch = useAppDispatch();

  const handleChangeMark = () => {
    const markDto = props.markDto.length
      ? [{ ...props.markDto[0], mark: markValue, attendance: attendanceValue }]
      : props.markDto;
    dispatch(
      actionSetSelectedStudentTeacher({
        ...props,
        markDto,
      }),
    );
  };

  if (!isEditing) return <Mark mark={markValue} attendance={attendanceValue} />;

  return (
    <Button
      className={cl(styles.markButton, isSelected && styles.selected)}
      variant="ghost"
      onClick={handleChangeMark}
    >
      <Mark mark={markValue} attendance={attendanceValue} />
    </Button>
  );
};
