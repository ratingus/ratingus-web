"use client";

import React from "react";

import styles from "./JoinOrganizationButton.module.scss";

import Button from "@/shared/components/Button/Button";
import {
  actionShowModal,
  INFO_ABOUT_ORGANIZATION_MODAL,
} from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";

const JoinOrganizationButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(actionShowModal(INFO_ABOUT_ORGANIZATION_MODAL));
  };
  return (
    <Button
      variant="important"
      className={styles.buttonInBlock}
      onClick={handleClick}
    >
      <Typography variant="h4" passColor>
        Присоединяйтесь к нам!
      </Typography>
    </Button>
  );
};

export default JoinOrganizationButton;
