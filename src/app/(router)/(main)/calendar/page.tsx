"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./page.module.scss";

import { DragDropCalendar } from "@/app/(router)/(main)/calendar/_content/DragDropCalendar";
import { UsualCalendar } from "@/app/(router)/(main)/calendar/_content/UsualCalendar";
import { useGetCalendarQuery } from "@/entity/Lesson/query";
import { useGetClassesQuery } from "@/entity/School/query";
import ClassSelector from "@/feature/ClassSelector/ClassSelector";
import Button from "@/shared/components/Button/Button";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { useUser } from "@/shared/hooks/useUser";

export default function Calendar() {
  const params = useSearchParams();
  const { classId: classIdFromUser } = useUser();
  const { data: classes } = useGetClassesQuery(null);
  const classId =
    Number(params.get("classId")) ||
    classIdFromUser ||
    (classes && classes[0].id) ||
    -1;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: calendar } = useGetCalendarQuery({ classId });
  console.log(calendar);

  if (!calendar) return <div>loading...</div>;

  return (
    <PageContainer isPanel className={styles.base}>
      <div className={styles.flex}>
        <ClassSelector />
        <Button
          isActive={isEditing}
          onClick={() => setIsEditing(!isEditing)}
          sizeVariant="medium"
          variant="secondary"
        >
          Редактировать
        </Button>
      </div>
      <div className={styles.calendarWrapper}>
        {isEditing ? (
          <DragDropCalendar isEditing={isEditing} lessonsByWeek={calendar} />
        ) : (
          <UsualCalendar lessonsByWeek={calendar} />
        )}
      </div>
    </PageContainer>
  );
}
