import React from "react";

import styles from "./MiniSchoolCardRole.module.scss";

import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardRoleProps = {
  role: string;
  classes: string[];
};

const MiniSchoolCardRole = ({ role, classes }: MiniSchoolCardRoleProps) => {
  return (
    <>
      <Typography variant="h4" component="div">
        {role}
      </Typography>
      <div className={styles.classes}>
        {classes.map((userClass) => (
          <Label variant="secondary" key={userClass}>
            {userClass}
          </Label>
        ))}
      </div>
    </>
  );
};

export default MiniSchoolCardRole;
