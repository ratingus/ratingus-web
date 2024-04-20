"use client";
import React from "react";

import Button from "@/shared/components/Button/Button";
import { Modal } from "@/shared/components/Modal/Modal";
import {
  actionShowModal,
  INFO_ABOUT_ORGANIZATION_MODAL,
} from "@/shared/components/Modal/slice";
import { useAppDispatch } from "@/shared/hooks/rtk";

const Content = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(actionShowModal(INFO_ABOUT_ORGANIZATION_MODAL));
  };
  return (
    <>
      <Button onClick={handleClick}>Открыть модалку</Button>
      <Modal modalName="infoAboutOrganizationModal">
        <h2>Привет!</h2>
      </Modal>
    </>
  );
};

export default Content;
