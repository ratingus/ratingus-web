"use client";
import React, { useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import cl from "classnames";

import styles from "@/app/(router)/(main)/calendar/page.module.scss";
import { ScheduleDay } from "@/entity/Lesson/model";
import { ScheduleCard } from "@/entity/Lesson/ui/LessonCard";
import { getFioByUser } from "@/entity/User/helpers";
import { UserIdentity } from "@/entity/User/model";
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
  const teachers: UserIdentity[] = [
    {
      id: 11,
      name: "Ирина",
      surname: "Фёдорова",
      patronymic: "Оскарльдовна",
    },
    {
      id: 12,
      name: "Изабелла",
      surname: "Фёдорова",
      patronymic: "Олеговна",
    },
  ];
  const subjects = [
    {
      id: 5,
      name: "Химия",
    },
    {
      id: 6,
      name: "Биология",
    },
  ];
  const lessonConstructor = [
    {
      id: 0,
      name: "Математика",
      teachers: [
        {
          id: 0,
          name: "Иван",
          surname: "Иванов",
          patronymic: "Иванович",
        },
        {
          id: 1,
          name: "Петр",
          surname: "Петров",
          patronymic: "Петрович",
        },
        {
          id: 2,
          name: "Сидор",
          surname: "Сидоров",
          patronymic: "Сидорович",
        },
      ],
    },
    {
      id: 1,
      name: "Физика",
      teachers: [
        {
          id: 0,
          name: "Иван",
          surname: "Иванов",
          patronymic: "Иванович",
        },
        {
          id: 1,
          name: "Петр",
          surname: "Петров",
          patronymic: "Петрович",
        },
        {
          id: 2,
          name: "Сидор",
          surname: "Сидоров",
          patronymic: "Сидорович",
        },
      ],
    },
  ];

  const maxTeachers = useMemo(
    () =>
      lessonConstructor.reduce((acc, { teachers }) => {
        return Math.max(acc, teachers?.length || 0);
      }, 0),
    [lessonConstructor],
  );

  const [isAddSubject, setIsAddSubject] = useState<boolean>(false);
  const [isAddTeacher, setIsAddTeacher] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleAddSubject = () => {
    setIsAddSubject(!isAddSubject);
    setIsAddTeacher(false);
  };
  const handleAddTeacher = () => {
    setIsAddTeacher(true);
    setIsAddSubject(false);
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
  };
  const handleDragStart = () => {
    setIsDragging(true);
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
                  {lessonConstructor.map(
                    (
                      { id: idLesson, name: lessonName, teachers },
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
                    lessonConstructor.map(({ id, name }) => (
                      <li key={id} className={styles.lessonConstructor}>
                        <Typography variant="h4" color="primaryMain">
                          {name}
                        </Typography>
                        <Button variant="secondary" onClick={handleAddTeacher}>
                          +
                        </Button>
                      </li>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button
              className={styles.addSubjectButton}
              variant="ghost"
              isActive={isAddSubject}
              onClick={handleAddSubject}
            >
              Добавить предмет
            </Button>
          </div>
          {isAddSubject && (
            <div className={cl(styles.listWrapper, styles.smallListWrapper)}>
              <ul className={styles.list}>
                {subjects.map(({ id, name }) => (
                  <li key={id} className={styles.lessonConstructor}>
                    <Button>{name}</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAddTeacher && (
            <div className={cl(styles.listWrapper, styles.smallListWrapper)}>
              <ul className={styles.list}>
                {teachers.map(({ id, ...teacher }) => (
                  <li key={id} className={styles.lessonConstructor}>
                    <Button>{getFioByUser(teacher)}</Button>
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
