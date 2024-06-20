import React from "react";

import styles from "./Schools.module.scss";

import { ProfileSchool } from "@/entity/School/model";
import MiniSchoolCard from "@/entity/School/ui/MiniSchoolCard";

type SchoolsProps = {
  schools: ProfileSchool[];
};

const Schools = ({ schools }: SchoolsProps) => {
  return (
    <div className={styles.base}>
      {schools.map((school) => (
        <MiniSchoolCard key={school.id} {...school} />
      ))}
    </div>
  );
};

export default Schools;
