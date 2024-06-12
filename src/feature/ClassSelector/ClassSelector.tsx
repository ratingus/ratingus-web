"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./ClassSelector.module.scss";

import { useGetClassesQuery } from "@/entity/School/query";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { useUser } from "@/shared/hooks/useUser";

type ClassSelectorProps = {};

const ClassSelector = ({}: ClassSelectorProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();
  const { classId: classIdFromUser } = useUser();
  const { data: classes } = useGetClassesQuery(null);
  const classId =
    Number(params.get("classId")) ||
    classIdFromUser ||
    (classes && classes[0].id) ||
    -1;

  if (!classes) {
    return <div>loading...</div>;
  }
  if (!params.has("classId")) {
    router.push(
      `${path}?${addQueryInParamsString(params, { name: "classId", value: classId })}`,
    );
  }

  const options = classes.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));
  const currentClass = classes.find(({ id }) => id === classId);

  return (
    <div>
      <Typography variant="h4" className={styles.label}>
        Класс
      </Typography>
      <Select
        className={styles.select}
        variant="dark"
        // @ts-ignore
        defaultValue={
          currentClass
            ? { label: currentClass.name, value: currentClass.id }
            : undefined
        }
        onChange={({ value }) => {
          if (value !== classId.toString()) {
            router.push(
              `${path}?${addQueryInParamsString(params, { name: "classId", value })}`,
            );
          }
        }}
        options={options}
      />
    </div>
  );
};

export default ClassSelector;
