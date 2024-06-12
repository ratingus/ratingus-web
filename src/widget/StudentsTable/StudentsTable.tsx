import { useEffect } from "react";
import cl from "classnames";
import { useSearchParams } from "next/navigation";

import styles from "./StudentsTable.module.scss";
import { StudentsTableMark } from "./StudentsTableMark";

import Mark from "@/entity/AttendanceMark/ui/Mark";
import { useGetJournalQuery } from "@/entity/Lesson/query";
import { selectSelectedStudentTeacher } from "@/entity/Lesson/store/journal/selectors";
import { actionSetSelectedStudentTeacher } from "@/entity/Lesson/store/journal/slice";
import { getFioByUser } from "@/entity/User/helpers";
import { Typography } from "@/shared/components/Typography/Typography";
import { getMonthName } from "@/shared/helpers/date";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";
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
  const dispatch = useAppDispatch();

  const selectedStudentLesson = useAppSelector(selectSelectedStudentTeacher);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
      const { key } = event;

      if (selectedStudentLesson && data) {
        const { index, studentDto } = selectedStudentLesson;
        const { students, monthLessonDays } = data;
        const studentIndex = students.findIndex(
          ({ id }) => id === studentDto.id,
        );
        if (studentIndex === -1) return;

        const verticalMax = students.length;
        const vertical = key === "ArrowDown" ? 1 : key === "ArrowUp" ? -1 : 0;
        const normiziledVertical =
          studentIndex + vertical >= verticalMax || studentIndex + vertical < 0
            ? 0
            : vertical;

        const newStudentIndex = students.findIndex(
          ({ id }) => id === studentDto.id + normiziledVertical,
        );
        if (newStudentIndex === -1) return;

        const monthMax = monthLessonDays.length;
        const monthDaysMax = monthLessonDays[index[0]].lessonDays.length;
        const horizontal =
          key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : 0;
        let horizontalMonth = index[0];
        let horizontalDay = index[1] + horizontal;
        if (horizontalDay >= monthDaysMax) {
          horizontalMonth++;
          horizontalDay = 0;
        } else if (horizontalDay < 0) {
          horizontalMonth--;
          horizontalDay =
            data.monthLessonDays[horizontalMonth].lessonDays.length - 1;
        }
        if (horizontalMonth >= monthMax || horizontalMonth < 0) return;

        const newIndex = [horizontalMonth, horizontalDay] as [number, number];
        if (
          ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(key) &&
          (vertical !== 0 || horizontal !== 0)
        ) {
          const month = monthLessonDays[newIndex[0]].month;
          const day = monthLessonDays[newIndex[0]].lessonDays[newIndex[1]].day;
          const lessonId =
            monthLessonDays[newIndex[0]].lessonDays[newIndex[1]].lessonId;
          const markDto = students[newStudentIndex].marks[month - 1].filter(
            ({ lessonId: lesson }) =>
              lessonId.some(({ lessonId }) => lesson === lessonId),
          );
          dispatch(
            actionSetSelectedStudentTeacher({
              lessonId,
              markDto,
              date: `${day} ${getMonthName(month - 1, true)}`,
              studentDto: students[newStudentIndex],
              index: newIndex,
            }),
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, dispatch, selectedStudentLesson]);

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
              {monthLessonDays.map(({ month, lessonDays }, monthIndex) => (
                <div key={getKey(month)} className={styles.header}>
                  {lessonDays.map(({ day, lessonId }, dayIndex) => {
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
                        <StudentsTableMark
                          index={[monthIndex, dayIndex]}
                          date={`${day} ${getMonthName(month - 1, true)}`}
                          isEditing={isEditing}
                          lessonId={lessonId}
                          studentDto={student}
                          markDto={markDto}
                        />
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
      {isEditing && !!selectedStudentLesson && (
        <div className={styles.info}>
          <StudentsTableDetails {...selectedStudentLesson} />
        </div>
      )}
    </>
  );
};

export default StudentsTable;
