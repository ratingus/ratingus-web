import React, { FocusEventHandler, useState } from "react";

import styles from "./LessonBlockDetailed.module.scss";

import Mark from "@/entity/AttendanceMark/ui/Mark";
import { LessonDetailed } from "@/entity/Lesson/model";
import { useAddNoteMutation } from "@/entity/Lesson/query";
import { getFioByUser } from "@/entity/User/helpers";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";

type LessonBlockDetailedProps = LessonDetailed & { date: Date };

const LessonBlockDetailed = ({
  scheduleId,
  lessonId,
  studentLessonId,
  date,
  subject,
  teacher,
  homework,
  note,
  mark,
  attendance,
}: LessonBlockDetailedProps) => {
  const [addNote] = useAddNoteMutation();
  const [prevValue, setPrevValue] = useState(note);
  const handleBlurNote: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;

    if (value !== prevValue) {
      setPrevValue(value);
      addNote({
        scheduleId,
        lessonId,
        date,
        lessonStudentId: studentLessonId,
        text: value,
      });
    }
  };
  return (
    <div className={styles.body}>
      <Typography color="primaryMain" variant="h2">
        {subject}
      </Typography>
      <Typography color="textHelper">{getFioByUser(teacher)}</Typography>

      <div className={styles.content}>
        {homework && (
          <div>
            <Typography variant="h4">Домашнее задание:</Typography>
            <Typography variant="body">{homework}</Typography>
          </div>
        )}
        <div>
          <Typography variant="h4">Заметки:</Typography>
          <Textarea
            variant="dark"
            defaultValue={note}
            placeholder="Добавьте заметку, это позволит вам лучше запомнить материал и не забыть о важных моментах урока."
            className={styles.textarea}
            onBlur={handleBlurNote}
          />
        </div>
        <div className={styles.flexFlexov}>
          {mark && (
            <div className={styles.flex}>
              <Typography variant="h4">Оценка:</Typography>
              <Mark mark={mark} />
            </div>
          )}
          {attendance && (
            <div className={styles.flex}>
              <Typography variant="h4">Посещаемость:</Typography>
              <Mark attendance={attendance} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonBlockDetailed;
