import React from "react";

import styles from "./Schools.module.scss";

import MiniSchoolCardInProfile from "@/entity/School/ui/MiniSchoolCardInProfile";

type SchoolsProps = {};

const Schools = ({}: SchoolsProps) => {
  const schools = [
    {
      schoolName: "Школа №31415",
      role: "Ученик",
      classes: ["Класс 9а"],
    },
    {
      schoolName: "Муз. шк.",
      role: "Ученик",
      classes: ["Скрипка", "Хор"],
    },
  ];

  return (
    <div className={styles.base}>
      {schools.map((school) => (
        <MiniSchoolCardInProfile key={school.schoolName} {...school} />
      ))}
    </div>
  );
};

export default Schools;
