import React from "react";

import styles from "./MiniSchoolCard.module.scss";
import MiniSchoolCardRole from "./MiniSchoolCardRole";

import { ProfileSchool } from "@/entity/School/model";
import ChooseSchool from "@/feature/ChooseSchool/ui/ChooseSchool";
import { Typography } from "@/shared/components/Typography/Typography";

type MiniSchoolCardInProfileProps = ProfileSchool;

const MiniSchoolCard = ({
  id,
  name,
  role,
  classDto,
}: MiniSchoolCardInProfileProps) => {
  return (
    <div className={styles.base}>
      <Typography variant="h2" component="div">
        <ChooseSchool
          buttonProps={{ variant: "ghost" }}
          school={{ id, name: name }}
        >
          {name}
        </ChooseSchool>
      </Typography>
      <MiniSchoolCardRole role={role} classDto={classDto} />
    </div>
  );
};

export default MiniSchoolCard;
