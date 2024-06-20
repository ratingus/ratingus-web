"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.scss";

import { selectSelectedTeacherId } from "@/entity/Lesson/store/journal/selectors";
import { RoleEnum } from "@/entity/User/model";
import ClassSelector from "@/feature/ClassSelector/ClassSelector";
import SubjectSelector from "@/feature/SubjectSelector/SubjectSelector";
import Button from "@/shared/components/Button/Button";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { useAppSelector } from "@/shared/hooks/rtk";
import { useUser } from "@/shared/hooks/useUser";
import { LessonsTable } from "@/widget/LessonsTable/LessonsTable";
import StudentsTable from "@/widget/StudentsTable/StudentsTable";

const options = [
  {
    value: "students",
    label: "Ученики",
  },
  {
    value: "lessons",
    label: "Занятия",
  },
];

export default function Journal() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const classId = Number(searchParams.get("classId"));
  const teacherSubjectId = Number(searchParams.get("teacherSubject"));
  const type = searchParams.get("type");
  const selectedOptionType = type || "students";
  const selectedOption =
    options.find((option) => option.value === selectedOptionType) || null;

  const [tab, setTab] = useState<TabOption<string> | null>(selectedOption);
  const handleChange = (value: TabOption<string>) => {
    setTab(value);
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "type", value: value.value })}`,
    );
  };
  const selectedValue = useAppSelector(selectSelectedTeacherId);
  const { userRoleId, role } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      handleChange(selectedOption);
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      selectedValue === null ||
      !!userRoleId ||
      userRoleId !== selectedValue
    ) {
      setIsEditing(false);
    }
  }, [selectedValue, userRoleId]);

  if (!tab) return <div>loading...</div>;

  return (
    <PageContainer
      ignoreHeader
      isPanel
      className={styles.base}
      actionSlot={
        <Tabs<string>
          onChange={handleChange}
          sizeVariant="big"
          defaultOption={tab}
          options={options}
        />
      }
    >
      <div className={styles.buttons}>
        <ClassSelector />
        <SubjectSelector />
        {selectedValue !== null &&
          !!userRoleId &&
          (userRoleId === selectedValue || role === RoleEnum.LOCAL_ADMIN) && (
            <Button
              isActive={isEditing}
              onClick={() => setIsEditing((prev) => !prev)}
              variant="secondary"
              className={styles.editButton}
            >
              Редактировать
            </Button>
          )}
      </div>
      <div className={styles.main}>
        {classId === -1 || teacherSubjectId === -1 ? (
          <div>Не выбран класс или предмет</div>
        ) : tab.value === "students" ? (
          <StudentsTable isEditing={isEditing} />
        ) : (
          <LessonsTable isEditing={isEditing} />
        )}
      </div>
    </PageContainer>
  );
}
