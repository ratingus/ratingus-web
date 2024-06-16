"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Users from "./_subPages/Users";
import styles from "./page.module.scss";

import Classes from "@/app/(router)/(main)/settings/_subPages/Classes";
import Other from "@/app/(router)/(main)/settings/_subPages/Other";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { ArrayType } from "@/shared/types";

const options = {
  users: {
    value: "users",
    label: "Пользователи",
  },
  classes: {
    value: "classes",
    label: "Классы",
  },
  other: {
    value: "other",
    label: "Прочее",
  },
};
type OptionType = keyof ArrayType<typeof options>;

const typedOptions = options as unknown as {
  [key in OptionType]: TabOption<OptionType>;
};

const optionsArray = Object.values(typedOptions);

export default function Settings() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const selectedOptionType = type || "users";
  const selectedOption = optionsArray.find(
    (option) => option.value === selectedOptionType,
  )!;

  const [tab, setTab] = useState<TabOption<OptionType>>(selectedOption);
  const handleChange = (value: TabOption<OptionType>) => {
    setTab(value);
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "type", value: value.value })}`,
    );
  };

  useEffect(() => {
    if (selectedOption) {
      handleChange(selectedOption);
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      className={styles.panel}
      ignoreHeader
      isPanel
      actionSlot={
        <Tabs<OptionType>
          sizeVariant="big"
          onChange={handleChange}
          defaultOption={selectedOption}
          options={optionsArray}
        />
      }
    >
      {tab.value === "users" && <Users />}
      {tab.value === "classes" && <Classes />}
      {tab.value === "other" && <Other />}
    </PageContainer>
  );
}
