"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import Schools from "./(pieces)/Schools";
import styles from "./page.module.scss";

import { getUserBirthdate } from "@/entity/User/helpers";
import { useGetProfileQuery } from "@/entity/User/query";
import Avatar from "@/entity/User/ui/Avatar";
import Button from "@/shared/components/Button/Button";
import { Modal } from "@/shared/components/Modal/Modal";
import {
  actionShowModal,
  ENTER_CODE_MODAL,
} from "@/shared/components/Modal/slice";
import PageContainer from "@/shared/components/PageContainer/PageContainer";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";

const EnterCodeModal = dynamic(
  () => import("@/widget/_modals/EnterCodeModal/EnterCodeModal"),
);

export default function Profile() {
  const { data: profile, isLoading } = useGetProfileQuery(null);
  const dispatch = useAppDispatch();
  if (!profile || isLoading) return "loading...";

  const { login, birthdate, fio, schools } = profile;

  const handleEnterCode = () => {
    dispatch(actionShowModal(ENTER_CODE_MODAL));
  };

  return (
    <>
      <PageContainer isPanel>
        <Image
          width={1370}
          height={186}
          src="/images/profile_empty_back_image.png"
          className={styles.image}
          alt="fas"
        />
        <div className={styles.panel}>
          <div className={styles.panelNavigation}>
            <Typography variant="h4" component="span">
              <Button variant="secondary" onClick={handleEnterCode}>
                Ввести код приглашения
              </Button>
            </Typography>
            <div>
              <Avatar avatarClassName={styles.avatar} />
              <div className={styles.profileDataWrapper}>
                <Typography variant="h2" component="div">
                  {login}
                </Typography>
                <Typography variant="h2" component="div">
                  {fio}
                </Typography>
                <Typography variant="h4" component="div" color="textHelper">
                  {getUserBirthdate(birthdate)}
                </Typography>
              </div>
            </div>
            <Typography variant="h4" component="span">
              <Button variant="secondary">Редактировать</Button>
            </Typography>
          </div>
          <Schools schools={schools} />
        </div>
      </PageContainer>
      <Modal modalName={ENTER_CODE_MODAL} className={styles.modal}>
        <EnterCodeModal />
      </Modal>
    </>
  );
}
