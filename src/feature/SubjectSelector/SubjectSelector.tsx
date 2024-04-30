"use client";
import React from "react";

import styles from "./SubjectSelector.module.scss";

import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";

const subjects = [
  {
    id: 0,
    name: "Математика",
  },
  {
    id: 1,
    name: "Русский язык",
  },
  {
    id: 2,
    name: "Литература",
  },
  {
    id: 3,
    name: "Информатика",
  },
  {
    id: 4,
    name: "Физика",
  },
  {
    id: 5,
    name: "Химия",
  },
  {
    id: 6,
    name: "Биология",
  },
  {
    id: 7,
    name: "История",
  },
];

type SubjectSelectorProps = {};

const SubjectSelector = ({}: SubjectSelectorProps) => {
  const options = subjects.map(({ name }) => ({ label: name, value: name }));
  const currentSubject = subjects.find(({ id }) => id === 3);

  return (
    <div>
      <Typography variant="h4" className={styles.label}>
        Предмет
      </Typography>
      <Select
        variant="dark"
        // @ts-ignore
        defaultValue={
          currentSubject
            ? { label: currentSubject.name, value: currentSubject.name }
            : undefined
        }
        options={options}
      />
    </div>
  );
};

export default SubjectSelector;
