import React, { useState } from "react";
import cl from "classnames";

import styles from "./StudentsTable.module.scss";

import { Attendance } from "@/entity/AttendanceMark/model";
import Mark from "@/entity/AttendanceMark/ui/Mark";
import { getFiByUser } from "@/entity/User/helpers";
import { students as mockedStudents } from "@/entity/User/mock";
import Button from "@/shared/components/Button/Button";

type StudentsTableProps = {};

const students = mockedStudents.sort((a, b) =>
  getFiByUser(a).localeCompare(getFiByUser(b)),
);

const monthDays = [
  {
    month: "Январь",
    days: [10, 12, 15, 17, 19, 22, 24, 27],
  },
  {
    month: "Февраль",
    days: [1, 6, 8, 13, 15, 29, 30, 31, 32],
  },
  {
    month: "Март",
    days: [1, 2, 11, 14, 21, 30],
  },
  {
    month: "Апрель",
    days: [6, 11, 13, 20, 25, 27],
  },
  {
    month: "Май",
    days: [4, 11, 13, 22, 27, 30],
  },
];

function seededRandom(seed: number) {
  const a = 16808; // multiplier
  const m = 2147483647; // 2**31 - 1
  const q = Math.floor(m / a);
  const r = m % a;

  seed = a * (seed % q) - r * Math.floor(seed / q);
  if (seed <= 0) {
    seed += m;
  }

  return seed / m;
}

const table = {
  students: students.map((student) => ({
    ...student,
    marks: monthDays.map(({ days }) =>
      days.map((day) => {
        const random = seededRandom(
          ((((137 * student.id * student.id * student.id) / 8 / 2) * day) / 2) *
            day *
            day,
        );
        return {
          mark:
            random < 0.9 && random > 0.45
              ? Math.floor(random * 5 + 1).toString()
              : undefined,
          attendance:
            random > 0.3 && random < 0.6
              ? random < 0.4
                ? "invalidAbsent"
                : "validAbsent"
              : undefined,
        } as { mark?: string; attendance?: Attendance };
      }),
    ),
  })),
  monthDays: monthDays,
};

const StudentsTable = ({}: StudentsTableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={2}>№</th>
            <th rowSpan={2} className={styles.fullsize}>
              Фамилия Имя
            </th>
            {table.monthDays.map(({ month, days }) => (
              <th key={month} colSpan={days.length}>
                {month}
              </th>
            ))}
            <th rowSpan={2}>Итог</th>
          </tr>
          <tr>
            {table.monthDays.map(({ days }) => (
              <>
                {days.map((day) => (
                  <th key={day} className={styles.day}>
                    {day}
                  </th>
                ))}
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td className={styles.fullsize}>{getFiByUser(student)}</td>
              {table.monthDays.map(({ days }, monthIndex) => (
                <>
                  {days.map((day, dayIndex) => (
                    <StudentsTableMark
                      key={day}
                      student={student.marks[monthIndex][dayIndex]}
                    />
                  ))}
                </>
              ))}
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;

type StudentsTableMarkProps = {
  student: (typeof table.students)[0]["marks"][0][0];
};

const StudentsTableMark = ({ student }: StudentsTableMarkProps) => {
  const [mark, setMark] = useState<string | undefined>(student.mark);
  const [attendance, setAttendance] = useState<Attendance | undefined>(
    student.attendance,
  );

  const handleChangeMark = () => {};

  return (
    <td className={cl(styles.day, styles.tdMark)}>
      <Button variant="ghost" onClick={handleChangeMark}></Button>
      <Mark variant="h4" mark={mark} attendance={attendance} />
    </td>
  );
};
