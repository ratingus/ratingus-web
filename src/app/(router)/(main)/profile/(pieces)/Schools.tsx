import React from "react";

import styles from "./Schools.module.scss";

import MiniSchoolCard from "@/entity/School/ui/MiniSchoolCard";

type SchoolsProps = {};

const Schools = ({}: SchoolsProps) => {
  const schools = [
    {
      id: 0,
      schoolName: "Школа №31415",
      role: "Ученик",
      classes: ["Класс 9а"],
    },
    {
      id: 1,
      schoolName: "Муз. шк.",
      role: "Ученик",
      classes: ["Скрипка", "Хор"],
    },
  ];

  return (
    <div className={styles.base}>
      {schools.map((school) => (
        <MiniSchoolCard key={school.schoolName} {...school} />
      ))}
    </div>
  );
};

export default Schools;
