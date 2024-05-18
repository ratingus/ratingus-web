"use client";
import { useState } from "react";

import Users from "./_subPages/Users";
import styles from "./page.module.scss";

import Classes from "@/app/(router)/(main)/settings/_subPages/Classes";
import Other from "@/app/(router)/(main)/settings/_subPages/Other";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Tabs } from "@/shared/components/Tabs/Tabs";

export default function Settings() {
  const [option, setOption] = useState("users");
  return (
    <PageContainer
      className={styles.panel}
      ignoreHeader
      isPanel
      actionSlot={
        <Tabs
          sizeVariant="big"
          onChange={(value) => setOption(value.value)}
          defaultOption={{
            value: "users",
            label: "Пользователи",
          }}
          options={[
            {
              value: "users",
              label: "Пользователи",
            },
            {
              value: "classes",
              label: "Классы",
            },
            {
              value: "other",
              label: "Прочее",
            },
          ]}
        />
      }
    >
      {option === "users" && <Users />}
      {option === "classes" && <Classes />}
      {option === "other" && <Other />}
    </PageContainer>
  );
}
