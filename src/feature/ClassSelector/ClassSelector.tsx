"use client";
import React from "react";

import styles from "./ClassSelector.module.scss";

import { classes } from "@/entity/School/mock";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { useUser } from "@/shared/hooks/useUser";

type ClassSelectorProps = {};

const ClassSelector = ({}: ClassSelectorProps) => {
  const { user } = useUser();
  const options = classes.map(({ name }) => ({ label: name, value: name }));
  const currentClass = classes.find(({ id }) => id === user.classId);

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
            ? { label: currentClass.name, value: currentClass.name }
            : undefined
        }
        options={options}
      />
    </div>
  );
};

export default ClassSelector;
