"use client";
import React, { useState } from "react";

import styles from "./page.module.scss";

import { selectSelectedTeacherId } from "@/entity/Lesson/store/journal/selectors";
import ClassSelector from "@/feature/ClassSelector/ClassSelector";
import SubjectSelector from "@/feature/SubjectSelector/SubjectSelector";
import Button from "@/shared/components/Button/Button";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { useAppSelector } from "@/shared/hooks/rtk";
import { useUser } from "@/shared/hooks/useUser";
import LessonsTable from "@/widget/LessonsTable/LessonsTable";
import StudentsTable from "@/widget/StudentsTable/StudentsTable";

export default function Journal() {
  const [tab, setTab] = useState<TabOption<string>>({
    value: "students",
    label: "Ученики",
  });
  const handleChange = (value: TabOption<string>) => {
    setTab(value);
  };
  const selectedValue = useAppSelector(selectSelectedTeacherId);
  const { userRoleId } = useUser();
  console.log("userRoleId", userRoleId);
  console.log("selectedValue", selectedValue);

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
          options={[
            {
              value: "students",
              label: "Ученики",
            },
            {
              value: "lessons",
              label: "Занятия",
            },
          ]}
        />
      }
    >
      <div className={styles.buttons}>
        <ClassSelector />
        <SubjectSelector />
        {selectedValue !== null &&
          !!userRoleId &&
          userRoleId === selectedValue && (
            <Button variant="secondary" className={styles.editButton}>
              Редактировать
            </Button>
          )}
      </div>
      {tab.value === "students" ? <StudentsTable /> : <LessonsTable />}
    </PageContainer>
  );
}
