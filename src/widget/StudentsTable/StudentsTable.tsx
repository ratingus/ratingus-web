import React, { useState } from "react";
import cl from "classnames";
import { useSearchParams } from "next/navigation";

import styles from "./StudentsTable.module.scss";

import { Attendance } from "@/entity/AttendanceMark/model";
import Mark from "@/entity/AttendanceMark/ui/Mark";
import { MarkDto } from "@/entity/Lesson/model";
import { useGetJournalQuery } from "@/entity/Lesson/query";
import { getFioByUser } from "@/entity/User/helpers";
import Button from "@/shared/components/Button/Button";
import { Typography } from "@/shared/components/Typography/Typography";
import { getMonthName } from "@/shared/helpers/date";
import StudentsTableDetails from "@/widget/StudentsTable/StudentsTableDetails";

type StudentsTableProps = {
  isEditing: boolean;
};

const StudentsTable = ({ isEditing }: StudentsTableProps) => {
  const searchParams = useSearchParams();
  const classId = Number(searchParams.get("classId"));
  const teacherSubjectId = Number(searchParams.get("teacherSubject"));
  const { data } = useGetJournalQuery(
    { classId, teacherSubjectId },
    { refetchOnMountOrArgChange: true },
  );

  if (!data) return <div>loading...</div>;
  const { students, monthLessonDays } = data;

  const getKey = (...value: any[]) =>
    `${teacherSubjectId}_${classId}_${value.join("_")}`;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.mainHeader}>
          <div className={styles.header}>
            <div className={cl(styles.block, styles.headerBlock)}>
              <Typography variant="h3">№</Typography>
            </div>
            <div className={cl(styles.fi, styles.headerBlock)}>
              <Typography variant="h4">Фамилия Имя</Typography>
            </div>
          </div>
          {students.map((student, index) => (
            <div key={getKey(student.id)} className={styles.header}>
              <div className={styles.block}>{index + 1}</div>
              <div className={styles.fi}>{getFioByUser(student)}</div>
            </div>
          ))}
        </div>
        <div className={cl(styles.overflow, styles.mainHeader)}>
          <div className={cl(styles.header, styles.absolute)}>
            {monthLessonDays.map(({ month, lessonDays }) => (
              <div key={getKey(month)} className={styles.months}>
                <div className={cl(styles.monthsAndDays, styles.headerBlock)}>
                  {getMonthName(month - 1)}
                </div>
                <div className={cl(styles.header)}>
                  {lessonDays.map(({ day }) => (
                    <div
                      key={getKey(day)}
                      className={cl(
                        styles.monthsAndDays,
                        styles.days,
                        styles.headerBlock,
                      )}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {students.map((student) => (
            <div
              key={getKey(student.id, student.studentId)}
              className={cl(styles.header, styles.headerMonths)}
            >
              {monthLessonDays.map(({ month, lessonDays }) => (
                <div key={getKey(month)} className={styles.header}>
                  {lessonDays.map(({ day, lessonId }) => {
                    const markDto = student.marks[month - 1].filter(
                      ({ lessonId: lesson }) =>
                        lessonId.some(({ lessonId }) => lesson === lessonId),
                    );
                    const { mark, attendance } = markDto[0] || {
                      mark: undefined,
                      attendance: undefined,
                    };
                    return (
                      <div
                        key={getKey(day, mark, attendance)}
                        className={styles.block}
                      >
                        <StudentsTableMark markDto={markDto} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.mainHeader}>
          <div className={cl(styles.block, styles.headerBlock, styles.itog)}>
            <Typography variant="h3">Итог</Typography>
          </div>
          {students.map(({ id, marks }) => {
            let length = 0;
            const mark = marks.reduce((acc, mark) => {
              const add = mark.reduce((acc, { mark }) => {
                if (mark) {
                  length++;
                  return acc + Number(mark);
                }
                return acc;
              }, 0);
              return acc + add;
            }, 0);

            const avgMark = mark / length;

            return (
              <div key={id} className={styles.itog}>
                <Mark mark={length === 0 ? "-" : avgMark.toFixed(2)} />
              </div>
            );
          })}
        </div>
      </div>
      {isEditing && (
        <div className={styles.info}>
          <StudentsTableDetails />
        </div>
      )}
    </>
  );
};

export default StudentsTable;

type StudentsTableMarkProps = {
  markDto: MarkDto[];
};

const StudentsTableMark = ({ markDto }: StudentsTableMarkProps) => {
  const { mark, attendance } = markDto[0] || {
    mark: undefined,
    attendance: undefined,
  };
  const [markStudent, setMarkStudent] = useState<string | undefined>(mark);
  const [attendanceStudent, setAttendanceStudent] = useState<
    Attendance | undefined
  >(attendance);

  const handleChangeMark = () =>
    console.log(markDto, markStudent, attendanceStudent);

  return (
    <Button
      className={styles.markButton}
      variant="ghost"
      onClick={handleChangeMark}
    >
      <Mark mark={markStudent} attendance={attendanceStudent} />
    </Button>
  );
};
