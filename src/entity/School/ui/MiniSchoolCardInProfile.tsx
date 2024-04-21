import React from "react";

import styles from "./MiniSchoolCardInProfile.module.scss";

import Button from "@/shared/components/Button/Button";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardInProfileProps = {
  schoolName: string;
  role: string;
  classes: string[];
};

const MiniSchoolCardInProfile = ({
  schoolName,
  role,
  classes,
}: MiniSchoolCardInProfileProps) => {
  return (
    <div className={styles.base}>
      <Typography variant="h2" component="div">
        <Button variant="ghost">{schoolName}</Button>
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
