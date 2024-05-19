"use client";

import React, { FormEventHandler, useRef } from "react";
import Link from "next/link";

import styles from "./InfoAboutOrganizationModal.module.scss";

import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { actionHideModal } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";

type InfoAboutOrganizationModalProps = {};

const InfoAboutOrganizationModal = ({}: InfoAboutOrganizationModalProps) => {
  const dispatch = useAppDispatch();
  const form = useRef(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      console.log(formData);
      console.log(formData.get("address"));
    }
    dispatch(actionHideModal());
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2">
        Заполните необходимую информацию об организации:
      </Typography>
      <form
        id="addOrganization"
        className={styles.form}
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className={styles.formContent}>
          <div className={styles.formBlockWithInputs}>
            <Typography variant="h3">Электронная почта организации:</Typography>
            <Input
              form="addOrganization"
              name="email"
              variant="dark"
              placeholder="Введите почту...."
            />
          </div>

          <div className={styles.formBlockWithInputs}>
            <Typography variant="h3">Название организации:</Typography>
            <Input
              form="addOrganization"
              name="name"
              variant="dark"
              placeholder="Введите название...."
            />
          </div>

          <div className={styles.formBlockWithInputs}>
            <Typography variant="h3">Адрес организации:</Typography>
            <Input
              form="addOrganization"
              name="address"
              variant="dark"
              placeholder="Введите адрес...."
            />
          </div>

          <div className={styles.flex}>
            <Input
              type="checkbox"
              form="addOrganization"
              name="isLegalRulesAccepted"
            />
            <Typography variant="h3">
              Я согласен с{" "}
              <Link
                href="/privacy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Пользовательским соглашением”
              </Link>
            </Typography>
          </div>
        </div>

        <Button variant="important">
          <Typography variant="h3" passColor>
            Отправить заявку
          </Typography>
        </Button>
      </form>
    </div>
  );
};

export default InfoAboutOrganizationModal;
