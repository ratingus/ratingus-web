import React from "react";

import styles from "./MiniSchoolCardInProfile.module.scss";

import { School } from "@/entity/School/model";
import ChooseSchool from "@/feature/ChooseSchool/ui/ChooseSchool";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardInProfileProps = {
  id: School["id"];
  schoolName: School["name"];
  role: string;
  classes: string[];
};

const MiniSchoolCardInProfile = ({
  id,
  schoolName,
  role,
  classes,
}: MiniSchoolCardInProfileProps) => {
  return (
    <div className={styles.base}>
      <Typography variant="h2" component="div">
        <ChooseSchool
          buttonProps={{ variant: "ghost" }}
          school={{ id, name: schoolName }}
        >
          {schoolName}
        </ChooseSchool>
      </Typography>
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
    </div>
  );
};

export default MiniSchoolCardInProfile;
