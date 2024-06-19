"use client";
import React, { useState } from "react";
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
  useAddTeacherSubjectInCalendarMutation,
  useAddTeacherSubjectMutation,
  useChangeTeacherSubjectInCalendarMutation,
  useDeleteTeacherSubjectInCalendarMutation,
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
  classId: number;
};

export const DragDropCalendar = ({
  isEditing,
  lessonsByWeek: calendar,
  classId,
}: DragDropCalendarProps) => {
  const [addTeacherSubjectCalendar] = useAddTeacherSubjectInCalendarMutation();
  const [changeTeacherSubjectsCalendar] =
    useChangeTeacherSubjectInCalendarMutation();
  const [deleteTeacherSubjectCalendar] =
    useDeleteTeacherSubjectInCalendarMutation();

  const { data: teachers } = useGetTeachersQuery(null);

  const { data: teacherSubjects } = useGetTeacherSubjectsQuery(null);
  const [addTeacherSubject] = useAddTeacherSubjectMutation();

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

  const handleDragEnd: OnDragEndResponder = async (result: DropResult) => {
    if (!result?.destination) return;

    const sourceId = parseInt(result.source.droppableId);
    const sourceIndex = result.source.index;
    const destinationId = parseInt(result.destination.droppableId);
    const destinationIndex = result.destination.index;
    console.log(
      "sourceId, sourceIndex, destinationId, destinationIndex",
      sourceId,
      sourceIndex,
      destinationId,
      destinationIndex,
    );

    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    if (sourceId === -1 && destinationId !== -1) {
      const studyWithTeacherId = parseInt(result.draggableId);
      addTeacherSubjectCalendar({
        data: {
          studyWithTeacherId,
          lessonNumber: destinationIndex,
          dayOfWeek: destinationId,
        },
        classId,
      });
    } else if (destinationId === -1) {
      deleteTeacherSubjectCalendar({
        data: {
          lessonNumber: sourceIndex,
          dayOfWeek: sourceId,
        },
        classId,
      });
    } else if (destinationIndex === 0) {
      await changeTeacherSubjectsCalendar({
        data: {
          from: { lessonNumber: sourceIndex, dayOfWeek: sourceId },
          to: { lessonNumber: destinationIndex, dayOfWeek: destinationId },
        },
        classId,
      });
    } else {
      await changeTeacherSubjectsCalendar({
        data: {
          from: { lessonNumber: sourceIndex, dayOfWeek: sourceId },
          to: { lessonNumber: destinationIndex, dayOfWeek: destinationId },
        },
        classId,
      });
    }

    setIsDragging(false);
  };
  const handleDragStart: OnBeforeDragStartResponder = (start: DragStart) => {
    console.dir(start);
    setIsDragging(true);
  };

  if (!teachers || !teacherSubjects)
    return <div>Нет учителей или предметов...</div>;

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
            <Droppable droppableId={`-1`}>
              {(provided) => {
                let index = 0;
                return (
                  <div
                    className={styles.list}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {teacherSubjects.map(
                      ({
                        subject: { id: idLesson, name: lessonName },
                        teachers,
                      }) =>
                        teachers?.map(
                          ({ id, teacherSubjectId, ...teacher }) => {
                            index++;
                            return (
                              <Draggable
                                key={`${idLesson}_${id}`}
                                draggableId={teacherSubjectId.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className={styles.lessonConstructor}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <Typography
                                      variant="h4"
                                      color="primaryMain"
                                    >
                                      {lessonName}
                                    </Typography>
                                    <Typography variant="body">
                                      {getFioByUser(teacher)}
                                    </Typography>
                                  </div>
                                )}
                              </Draggable>
                            );
                          },
                        ),
                    )}
                    {!isDragging &&
                      teacherSubjects
                        .filter(
                          ({ teachers: teachersFromSubject }) =>
                            teachersFromSubject == null ||
                            (teachersFromSubject || []).length <
                              teachers.length,
                        )
                        .map(({ subject: { id, name } }) => (
                          <li
                            key={id}
                            className={cl(
                              styles.lessonConstructor,
                              chosenSubject?.subject.id === id &&
                                styles.isActive,
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
                              Добавить учителя
                            </Button>
                          </li>
                        ))}
                    {provided.placeholder}
                  </div>
                );
              }}
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
        {calendar.map((dayLesson, index) => (
          <Droppable
            droppableId={`${dayLesson.dayOfWeek}`}
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
                      draggableId={`${dayLesson.dayOfWeek}_${lesson.timetableNumber}`}
                      index={lesson.timetableNumber}
                      isDragDisabled={lesson.subject === "Окно"}
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
