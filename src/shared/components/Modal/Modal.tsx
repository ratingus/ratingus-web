"use client";
import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import cl from "classnames";

import styles from "./Modal.module.scss";
import { actionHideModalByName, ModalName, selectIsModalActive } from "./slice";

import Button from "@/shared/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";
import CloseIcon from "@/shared/icons/close.svg";

type ModalProps = {
  className?: string;
  children: ReactNode;
  modalName: ModalName;
  maxContent?: boolean;
};

export const Modal = ({
  className,
  children,
  modalName,
  maxContent,
}: ModalProps) => {
  const isModalActive = useAppSelector(selectIsModalActive(modalName));
  const dispatch = useAppDispatch();

  if (!isModalActive) {
    return null;
  }

  const handleClose = () => {
    dispatch(actionHideModalByName(modalName));
  };

  return (
    <ReactModal
      className={cl(styles.base, maxContent && styles.maxContent, className)}
      overlayClassName={styles.overlay}
      isOpen
    >
      <Button className={styles.close} onClick={handleClose} variant="ghost">
        <CloseIcon />
      </Button>
      {children}
    </ReactModal>
  );
};
