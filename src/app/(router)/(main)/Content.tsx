"use client";
import React from "react";

import Button from "@/shared/components/Button/Button";
import { Modal } from "@/shared/components/Modal/Modal";
import {
  actionShowModal,
  INFO_ABOUT_ORGANIZATION_MODAL,
} from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";

const Content = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(actionShowModal(INFO_ABOUT_ORGANIZATION_MODAL));
  };
  return (
    <>
      <Button variant="secondary" onClick={handleClick}>
        Открыть модалку
      </Button>
      <Modal modalName="infoAboutOrganizationModal">
        <Typography variant="h2" component="div">
          Привет!
        </Typography>
      </Modal>
    </>
  );
};

export default Content;
