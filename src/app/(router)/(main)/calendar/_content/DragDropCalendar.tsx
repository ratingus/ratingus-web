"use client";
import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
  OnBeforeDragStartResponder,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import cl from "classnames";

import styles from "@/app/(router)/(main)/calendar/page.module.scss";
import { ScheduleCard } from "@/entity/Lesson/ui/LessonCard";
import { ScheduleDay, TeacherSubjects } from "@/entity/Schedule/model";
import {
  useAddTeacherSubjectMutation,
  useGetTeachersQuery,
  useGetTeacherSubjectsQuery,
} from "@/entity/Schedule/query";
import { getFioByUser } from "@/entity/User/helpers";
import Button from "@/shared/components/Button/Button";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDayOfWeek } from "@/shared/helpers/date";

type DragDropCalendarProps = {
  isEditing: boolean;
  lessonsByWeek: ScheduleDay[];
};

export const DragDropCalendar = ({
  isEditing,
  lessonsByWeek,
}: DragDropCalendarProps) => {
  const { data: teachers } = useGetTeachersQuery(null);
  console.log(teachers);

  const { data: teacherSubjects } = useGetTeacherSubjectsQuery(null);
  const [addTeacherSubject] = useAddTeacherSubjectMutation();

  const maxTeachers = useMemo(
    () =>
      teacherSubjects?.reduce((acc, { teachers }) => {
        return Math.max(acc, teachers?.length || 0);
      }, 0) || 0,
    [teacherSubjects],
  );

  const [chosenSubject, setChosenSubject] = useState<TeacherSubjects | null>(
    null,
  );

  const [isDragging, setIsDragging] = useState(false);

  const handleAddTeacher = (subjectId: number) => {
    if (chosenSubject?.subject.id === subjectId) {
      setChosenSubject(null);
      return;
    }
    const newChosenSubject =
      teacherSubjects && teacherSubjects.length > 0
        ? teacherSubjects.filter(({ subject: { id } }) => id === subjectId)[0]
        : null;
    setChosenSubject(newChosenSubject);
  };

  const handleDragEnd: OnDragEndResponder = (result: DropResult) => {
    console.dir(result);
    setIsDragging(false);
  };
  const handleDragStart: OnBeforeDragStartResponder = (start: DragStart) => {
    console.dir(start);
    setIsDragging(true);
  };

  if (!teachers || !teacherSubjects) return <div>loading...</div>;

  const handleMergeTeacherSubject = async (id: number) => {
    if (chosenSubject) {
      // @ts-ignore
      const { data: newTeacherSubject } = await addTeacherSubject({
        subjId: chosenSubject.subject.id.toString(),
        teacherId: id.toString(),
      });
      if (newTeacherSubject) {
        setChosenSubject({
          ...(chosenSubject || {}),
          teachers: [
            ...(chosenSubject?.teachers || []),
            newTeacherSubject.teacher,
          ],
        });
      }
    }
  };
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onBeforeDragStart={handleDragStart}
    >
      {isEditing && (
        <>
          <div className={styles.listWrapper}>
            <Droppable droppableId={`droppable0`}>
              {(provided) => (
                <div
                  className={styles.list}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {teacherSubjects.map(
                    (
                      { subject: { id: idLesson, name: lessonName }, teachers },
                      indexLesson,
                    ) =>
                      teachers?.map(({ id, ...teacher }, index) => (
                        <Draggable
                          key={`${idLesson}_${id}`}
                          draggableId={`${idLesson}_${id}`}
                          index={indexLesson * maxTeachers + index}
                        >
                          {(provided) => (
                            <div
                              className={styles.lessonConstructor}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <Typography variant="h4" color="primaryMain">
                                {lessonName}
                              </Typography>
                              <Typography variant="body">
                                {getFioByUser(teacher)}
                              </Typography>
                            </div>
                          )}
                        </Draggable>
                      )),
                  )}
                  {!isDragging &&
                    teacherSubjects
                      .filter(
                        ({ teachers }) =>
                          (teachers || []).length !== maxTeachers,
                      )
                      .map(({ subject: { id, name } }) => (
                        <li
                          key={id}
                          className={cl(
                            styles.lessonConstructor,
                            chosenSubject?.subject.id === id && styles.isActive,
                          )}
                        >
                          <Typography variant="h4" color="primaryMain">
                            {name}
                          </Typography>
                          <Button
                            isActive={chosenSubject?.subject.id === id}
                            variant="secondary"
                            onClick={() => handleAddTeacher(id)}
                          >
                            +
                          </Button>
                        </li>
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {chosenSubject && (
            <div className={cl(styles.listWrapper, styles.smallListWrapper)}>
              <ul className={styles.list}>
                {teachers
                  .filter(
                    (teacher) =>
                      !chosenSubject.teachers
                        ?.map(({ id }) => id)
                        .includes(teacher.id),
                  )
                  .map(({ id, ...teacher }) => (
                    <li key={id} className={styles.lessonConstructor}>
                      <Button onClick={() => handleMergeTeacherSubject(id)}>
                        {getFioByUser(teacher)}
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
      <div className={cl(styles.calendar, styles.card)}>
        {lessonsByWeek.map((dayLesson, index) => (
          <Droppable
            droppableId={`droppable_${index + 1}`}
            key={dayLesson.dayOfWeek}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cl(styles.card, styles.dayLesson)}
              >
                <Typography variant="h4">
                  {getDayOfWeek(dayLesson.dayOfWeek)}
                </Typography>
                <div className={styles.lessons}>
                  {dayLesson.studies.map((lesson) => (
                    <Draggable
                      key={lesson.timetableNumber}
                      draggableId={`${dayLesson.dayOfWeek}__${lesson.timetableNumber}`}
                      index={dayLesson.dayOfWeek * 49 + lesson.timetableNumber}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <ScheduleCard {...lesson} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
