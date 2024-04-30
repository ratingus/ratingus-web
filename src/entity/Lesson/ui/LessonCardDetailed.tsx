import { LessonDetailed } from "../model";

import styles from "./LessonCardDetailed.module.scss";

import LessonCard from "@/entity/Lesson/ui/LessonCard";
import { Typography } from "@/shared/components/Typography/Typography";

type LessonCardProps = LessonDetailed;

const LessonCardDetailed = (lesson: LessonCardProps) => {
  const { homework, note } = lesson;
  return (
    <LessonCard
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
