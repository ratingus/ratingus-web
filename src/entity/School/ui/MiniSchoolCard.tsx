import React from "react";

import styles from "./MiniSchoolCard.module.scss";
import MiniSchoolCardRole from "./MiniSchoolCardRole";

import { School } from "@/entity/School/model";
import ChooseSchool from "@/feature/ChooseSchool/ui/ChooseSchool";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardInProfileProps = {
  id: School["id"];
  schoolName: School["name"];
  role: string;
  classes: string[];
};

const MiniSchoolCard = ({
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
      <MiniSchoolCardRole role={role} classes={classes} />
    </div>
  );
};

export default MiniSchoolCard;
