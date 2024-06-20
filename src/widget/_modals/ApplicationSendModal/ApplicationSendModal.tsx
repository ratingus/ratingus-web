"use client";

import React from "react";

import styles from "./ApplicationSendModal.module.scss";

import { Typography } from "@/shared/components/Typography/Typography";

type InfoAboutOrganizationModalProps = {};

const ApplicationSendModal = ({}: InfoAboutOrganizationModalProps) => (
  <div className={styles.wrapper}>
    <Typography variant="h2" className={styles.text}>
      Заявка принята! Ожидайте решения в письме на указанную почту
    </Typography>
  </div>
);

export default ApplicationSendModal;
