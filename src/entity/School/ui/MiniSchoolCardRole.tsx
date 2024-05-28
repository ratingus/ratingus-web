import React from "react";

import styles from "./MiniSchoolCardRole.module.scss";

import { ProfileSchool } from "@/entity/School/model";
import { getRoleByType } from "@/entity/User/helpers";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardRoleProps = Pick<ProfileSchool, "role" | "classDto">;

const MiniSchoolCardRole = ({ role, classDto }: MiniSchoolCardRoleProps) => {
  return (
    <>
      <Typography variant="h4" component="div">
        {getRoleByType(role)}
      </Typography>
      {classDto && (
        <div className={styles.classes}>
          <Label variant="secondary">{classDto.name}</Label>
        </div>
      )}
    </>
  );
};

export default MiniSchoolCardRole;
