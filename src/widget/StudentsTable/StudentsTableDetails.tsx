import { FormEventHandler, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import styles from "./StudentsTableDetails.module.scss";
import { StudentsTableMarkProps } from "./StudentsTableMark";

import { ATTENDANCE } from "@/entity/AttendanceMark/constants";
import { Attendance } from "@/entity/AttendanceMark/model";
import Mark from "@/entity/AttendanceMark/ui/Mark";
import { MagazineDto, MarkDto } from "@/entity/Lesson/model";
import {
  updateJournalCache,
  useAddMarkMutation,
  useGetJournalQuery,
} from "@/entity/Lesson/query";
import { actionSetSelectedStudentTeacher } from "@/entity/Lesson/store/journal/slice";
import { getFiByUser } from "@/entity/User/helpers";
import Button from "@/shared/components/Button/Button";
import { Select, SelectOption } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";
import { useAppDispatch } from "@/shared/hooks/rtk";

const options: SelectOption[] = [
  {
    value: undefined,
    label: "Не выбрано",
  },
  ...Object.entries(ATTENDANCE).map(([value, label]) => ({
    value,
    label,
  })),
];

type StudentsTableDetailsProps = StudentsTableMarkProps & { date?: string };

const StudentsTableDetails = (props: StudentsTableDetailsProps) => {
  const { studentDto, markDto, lessonId, date, index } = props;
  const searchParams = useSearchParams();
  const classId = Number(searchParams.get("classId"));
  const teacherSubjectId = Number(searchParams.get("teacherSubject"));
  const { data } = useGetJournalQuery(
    { classId, teacherSubjectId },
    { refetchOnMountOrArgChange: true },
  );

  const [addMark] = useAddMarkMutation();

  const dispatch = useAppDispatch();

  const { mark, attendance } = markDto[0] || {
    mark: undefined,
    attendance: undefined,
  };
  const [markValue, setMarkValue] = useState(mark);
  const [attendanceValue, setAttendanceValue] = useState(attendance);

  const change = useCallback(
    ({ monthLessonDays }: MagazineDto) => {
      const month = monthLessonDays[index[0]].month;
      const day = monthLessonDays[index[0]].lessonDays[index[1]].day;
      const dateDate = new Date(2024, month - 1, day);
      const dateDayjs = dayjs(dateDate);
      const date = dayjs(dateDate)
        .add(dateDayjs.utcOffset(), "minutes")
        .toDate();
      addMark({
        mark: markValue,
        attendance: attendanceValue,
        lessonId: lessonId[0].lessonId,
        studentId: studentDto.id,
        scheduleId: lessonId[0].scheduleId,
        lessonStudentId: markDto?.[0]?.studentLessonId,
        date,
      }).then((response) => {
        // @ts-ignore
        if (response?.data) {
          // @ts-ignore
          const data = response.data;
          const newMarkDto: MarkDto[] = markDto.length
            ? [{ ...markDto[0], mark: markValue, attendance: attendanceValue }]
            : [{ ...data, mark: markValue, attendance: attendanceValue }];
          dispatch(
            actionSetSelectedStudentTeacher({
              ...props,
              markDto: newMarkDto,
            }),
          );

          updateJournalCache(dispatch, {
            index,
            classId,
            scheduleId: lessonId[0].scheduleId,
            teacherSubjectId,
            studentDto,
            markDto,
            newMarkDto,
            data,
          });
          yaMetricaEvent("Поставить оценку в журнале");
        }
      });
    },
    [
      addMark,
      attendanceValue,
      classId,
      dispatch,
      index,
      lessonId,
      markDto,
      markValue,
      props,
      studentDto,
      teacherSubjectId,
    ],
  );

  useEffect(() => {
    setMarkValue(mark);
    setAttendanceValue(attendance);
  }, [attendance, mark, markDto]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (["1", "2", "3", "4", "5"].includes(key)) {
        setMarkValue(key);
      } else if (["Н", "О", "У"].includes(key.toUpperCase())) {
        let value = Object.entries(ATTENDANCE).find(
          ([_, label]) => label[0] === key.toUpperCase(),
        )?.[0] as Attendance | undefined;
        setAttendanceValue(value);
      } else if (["Backspace", "Delete"].includes(key)) {
        setMarkValue(undefined);
        setAttendanceValue(undefined);
      } else if (key === "Enter") {
        if (data) {
          change(data);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [change, data]);

  const attendanceOption = attendanceValue
    ? ({
        value: attendanceValue,
        label: ATTENDANCE[attendanceValue],
      } as SelectOption)
    : undefined;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (data) {
      change(data);
    }
  };

  const handleReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setMarkValue(mark);
    setAttendanceValue(attendance);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={styles.wrapper}
    >
      <div className={styles.main}>
        <Typography variant="h4" className={styles.bubble}>
          {date}
        </Typography>
        <Typography variant="h4" className={styles.bubble}>
          {getFiByUser(studentDto)}
        </Typography>
        <div className={styles.flex}>
          <Typography variant="h4">Оценка:</Typography>
          <div className={styles.block}>
            <Mark mark={markValue} attendance={attendanceValue} />
          </div>
        </div>
        <div className={styles.center}>
          <Typography variant="h4">Посещаемость:</Typography>
          <Select
            className={styles.select}
            onChange={({ value }) =>
              setAttendanceValue(value as Attendance | undefined)
            }
            value={
              options.find(
                ({ value }) =>
                  value ===
                  (attendanceValue === null ? undefined : attendanceValue),
              ) as
                | ((string | number | readonly string[]) & SelectOption)
                | undefined
            }
            options={options}
            defaultValue={
              attendanceOption as
                | ((string | number | readonly string[]) & SelectOption)
                | undefined
            }
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button type="submit" variant="important">
          Поставить
        </Button>
        <Button type="reset" variant="error">
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default StudentsTableDetails;
