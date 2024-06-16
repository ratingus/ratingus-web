import { useCallback, useEffect, useRef, useState } from "react";
import cl from "classnames";
import { useSearchParams } from "next/navigation";

import styles from "./LessonsTable.module.scss";

import { BaseMagazineLesson, MagazineLesson } from "@/entity/Lesson/model";
import {
  useAddLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsQuery,
  useUpdateLessonMutation,
} from "@/entity/Lesson/query";
import Button from "@/shared/components/Button/Button";
import { Checkbox } from "@/shared/components/Checkbox";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";
import { formatDateForInput, getDayAndMonth } from "@/shared/helpers/date";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";

// import styles from './LessonsTable.module.scss';

type LessonsTableProps = {
  isEditing: boolean;
};

export const LessonsTable = ({ isEditing }: LessonsTableProps) => {
  const searchParams = useSearchParams();
  const classId = Number(searchParams.get("classId"));
  const teacherSubjectId = Number(searchParams.get("teacherSubject"));
  const { data: lessons } = useGetLessonsQuery(
    { classId, teacherSubjectId },
    { refetchOnMountOrArgChange: true },
  );

  const [isEditingId, setIsEditing] = useState<number | undefined>();

  if (!lessons) return <div>loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.lessons}>
        {lessons.map((lesson) => (
          <DefaultLesson
            onClick={() => isEditing && setIsEditing(lesson.id)}
            key={lesson.id}
            isEditing={isEditing}
            isCurrentEditing={isEditingId === lesson.id}
            lesson={lesson}
          />
        ))}
      </div>
      {!isEditing &&
        (isEditingId === -1 ? (
          <CreateLesson
            isCurrentEditing
            isEditing
            onReset={() => setIsEditing(undefined)}
          />
        ) : (
          <Button
            variant="important"
            className={styles.add}
            onClick={() => setIsEditing(-1)}
          >
            +
          </Button>
        ))}
    </div>
  );
};

type Props = Omit<MagazineLesson, "id" | "lessonNumber"> & {
  isEditing: boolean;
  isCurrentEditing: boolean;
  onDateChanged: (value: Date) => void;
  onThemeChanged: (value: string) => void;
  onHomeworkChanged: (value: string) => void;
  onFinishedChange: (value: boolean) => void;
  onReset: () => void;
  onSave: () => void;
  onDelete?: () => void;
  onClick?: () => void;
};

const Lesson = ({
  onClick,
  isEditing,
  isCurrentEditing,
  date,
  theme,
  homework,
  finished,
  onDateChanged,
  onThemeChanged,
  onHomeworkChanged,
  onFinishedChange,
  onReset,
  onSave,
  onDelete,
}: Props) => {
  const themeTextarea = useRef<HTMLTextAreaElement>();
  const homeworkTextarea = useRef<HTMLTextAreaElement>();

  return (
    <div
      className={cl(
        styles.lesson,
        isEditing &&
          cl(onClick && styles.clickable, isCurrentEditing && styles.clicked),
      )}
      onClick={onClick}
    >
      {!isEditing ? (
        <Typography color="textHelper">{getDayAndMonth(date)}</Typography>
      ) : (
        <input
          className={styles.date}
          type="date"
          value={formatDateForInput(new Date(date))}
          onChange={({ target }) => onDateChanged(new Date(target.value))}
        />
      )}
      <div className={styles.row}>
        <Typography variant="h4" color="textHelper">
          Тема:
        </Typography>
        <Textarea
          // @ts-ignore
          ref={themeTextarea}
          className={styles.textarea}
          variant="ghost"
          disabled={!isEditing}
          onChange={({ target }) => onThemeChanged(target.value)}
          value={theme}
        />
      </div>
      <div className={styles.row}>
        <Typography variant="h4" color="textHelper">
          Д/з:
        </Typography>
        <Textarea
          // @ts-ignore
          ref={homeworkTextarea}
          className={styles.textarea}
          variant="ghost"
          disabled={!isEditing}
          onChange={({ target }) => onHomeworkChanged(target.value)}
          value={homework}
        />
      </div>
      <div className={cl(styles.row, styles.buttonsContainer)}>
        <div className={styles.row}>
          <Typography variant="h4" color="textHelper">
            Проведено:{" "}
          </Typography>
          <Checkbox
            disabled={!isEditing}
            checked={finished}
            onChange={({ currentTarget }) =>
              onFinishedChange(Boolean(currentTarget.checked))
            }
          />
        </div>
        {isEditing
          ? isCurrentEditing && (
              <div className={cl(styles.row, styles.centered)}>
                <Button variant="error" onClick={onReset}>
                  Отменить
                </Button>
                <Button variant="important" onClick={onSave}>
                  Сохранить
                </Button>
              </div>
            )
          : onDelete && (
              <Button variant="error" onClick={onDelete}>
                Удалить
              </Button>
            )}
      </div>
    </div>
  );
};

const DefaultLesson = ({
  onClick,
  lesson: baseLesson,
  isEditing,
  isCurrentEditing,
}: {
  onClick: () => void;
  lesson: MagazineLesson;
  isEditing: boolean;
  isCurrentEditing: boolean;
}) => {
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const handleDelete = () => {
    deleteLesson(baseLesson.id);
  };

  return (
    <LessonComponent
      onClick={onClick}
      onSave={(lesson) =>
        updateLesson({ lessonId: baseLesson.id, ...lesson }).then(() => {
          if (baseLesson.homework !== lesson.homework) {
            yaMetricaEvent("Изменить домашнее задание в журнале");
          }
        })
      }
      isEditing={isEditing}
      isCurrentEditing={isCurrentEditing}
      onDelete={handleDelete}
      {...baseLesson}
    />
  );
};

const CreateLesson = ({
  isEditing,
  isCurrentEditing,
  onReset,
}: {
  isEditing: boolean;
  isCurrentEditing: boolean;
  onReset: () => void;
}) => {
  const initLesson = {
    id: -1,
    lessonNumber: -1,
    theme: "",
    date: new Date().toDateString(),
    homework: "",
    finished: false,
  };

  const searchParams = useSearchParams();
  const classId = Number(searchParams.get("classId"));
  const teacherSubjectId = Number(searchParams.get("teacherSubject"));
  const [addLesson] = useAddLessonMutation();

  return (
    <LessonComponent
      onSave={(lesson) => {
        addLesson({
          classId,
          teacherSubjectId,
          scheduleId: -1,
          ...lesson,
        }).then(() => {
          if (initLesson.homework !== lesson.homework) {
            yaMetricaEvent("Выдать домашнее задание в журнале");
          }
        });
      }}
      onReset={onReset}
      isEditing={isEditing}
      isCurrentEditing={isCurrentEditing}
      {...initLesson}
    />
  );
};

const LessonComponent = ({
  onClick,
  isEditing,
  isCurrentEditing,
  theme: initTheme,
  date: initDate,
  homework: initHomework,
  finished: initFinished,
  onReset,
  onSave,
  onDelete,
}: MagazineLesson & {
  onClick?: () => void;
  isEditing: boolean;
  isCurrentEditing: boolean;
  onReset?: () => void;
  onDelete?: () => void;
  onSave: (lesson: BaseMagazineLesson) => void;
}) => {
  const [theme, setTheme] = useState(initTheme);
  const [homework, setHomework] = useState(initHomework);
  const [date, setDate] = useState<Date>(new Date(initDate));
  const [finished, setFinished] = useState<boolean | undefined>(initFinished);

  const [saved, setSaved] = useState(false);

  const reset = useCallback(() => {
    setTheme(initTheme);
    setHomework(initHomework);
    setDate(new Date(initDate));
    setFinished(initFinished);
  }, [initDate, initFinished, initHomework, initTheme]);

  const handleReset = useCallback(() => {
    reset();
    onReset?.();
  }, [onReset, reset]);

  const handleSave = () => {
    onSave({
      theme,
      homework,
      date: date.toISOString(),
      finished,
    });
    setSaved(true);
  };

  useEffect(() => {
    if (!isCurrentEditing) {
      setSaved(false);
      handleReset();
    }
  }, [handleReset, isCurrentEditing, saved]);

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Lesson
      onClick={onClick}
      theme={theme}
      onThemeChanged={setTheme}
      date={date.toISOString()}
      onDateChanged={setDate}
      homework={homework}
      onHomeworkChanged={setHomework}
      finished={finished}
      onFinishedChange={(v) => setFinished(v)}
      isEditing={isEditing}
      isCurrentEditing={isCurrentEditing}
      onReset={handleReset}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
};
