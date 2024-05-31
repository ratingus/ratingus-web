import { LessonDetailed } from "../model";

import styles from "./LessonCardDetailed.module.scss";

import { Typography } from "@/shared/components/Typography/Typography";
import DiaryLessonCard from "@/widget/DiaryLessonCard/DiaryLessonCard";

type LessonCardProps = LessonDetailed & { day: number };

const LessonCardDetailed = ({ day, ...lesson }: LessonCardProps) => {
  const { homework, note } = lesson;
  return (
    <DiaryLessonCard
      day={day}
      {...lesson}
      bottomSlot={
        // TODO: такой же блок в LessonBlockDetailed? Генералифицировать!
        <>
          {homework && (
            <div className={styles.flexStart}>
              <Typography>Домашнее задание:</Typography>
              <Typography variant="caption">{homework}</Typography>
            </div>
          )}
          {note && (
            <div className={styles.flexStart}>
              <Typography>Заметки:</Typography>
              <Typography variant="caption">{note}</Typography>
            </div>
          )}
        </>
      }
    />
  );
};

export default LessonCardDetailed;
