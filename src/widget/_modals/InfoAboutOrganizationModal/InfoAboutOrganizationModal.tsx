"use client";

import React, { ChangeEvent, FormEventHandler, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import Link from "next/link";

import styles from "./InfoAboutOrganizationModal.module.scss";

import { useCreateApplicationMutation } from "@/entity/School/query";
import Button from "@/shared/components/Button/Button";
import { Checkbox } from "@/shared/components/Checkbox";
import { BaseInputProps, Input } from "@/shared/components/Input/Input";
import {actionHideModal, actionShowModalCloseOther, APPLICATION_SEND_MODAL} from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";
import { useAppDispatch } from "@/shared/hooks/rtk";

type InfoAboutOrganizationModalProps = {};

const InfoAboutOrganizationModal = ({}: InfoAboutOrganizationModalProps) => {
  const dispatch = useAppDispatch();
  const [createAnnouncement] = useCreateApplicationMutation();

  const form = useRef(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const email = getFromForm(formData, "email");
      const name = getFromForm(formData, "name");
      const address = getFromForm(formData, "address");
      const phone = getFromForm(formData, "phone");
      const isLegalRulesAccepted = Boolean(
        getFromForm(formData, "isLegalRulesAccepted"),
      );

      if (!email || !name || !address || !phone) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (phone.length < 18) {
        toast("Неправильный номер телефона", {
          type: "error",
        });
        return;
      }
      if (!isLegalRulesAccepted) {
        toast('Согласитесь с "Пользовательским соглашением"', {
          type: "error",
        });
        return;
      }
      createAnnouncement({
        email,
        name,
        address,
        phone,
      }).then(() => {
        yaMetricaEvent("Отправить заявку на создание учебной организации");
        dispatch(actionShowModalCloseOther(APPLICATION_SEND_MODAL));
      });
    }
  };

  const [phone, setPhone] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
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

          <div className={styles.formBlockWithInputs}>
            <Typography variant="h3">Номер телефона организации:</Typography>
            <InputMask
              mask="+7 (999) 999 99 99"
              maskChar={null}
              value={phone}
              onChange={handleChange}
            >
              {/* @ts-ignore */}
              {(inputProps: BaseInputProps) => (
                <Input
                  {...inputProps}
                  form="addOrganization"
                  name="phone"
                  variant="dark"
                  placeholder="Введите номер телефона...."
                />
              )}
            </InputMask>
          </div>

          <div className={styles.flex}>
            <Checkbox form="addOrganization" name="isLegalRulesAccepted" />
            <Typography variant="h3">
              Я согласен с{" "}
              <Link href="/privacy.pdf" target="_blank">
                “Пользовательским соглашением”
              </Link>
            </Typography>
          </div>
        </div>

        <div className={styles.submitButtonWrapper}>
          <Button variant="important">
            <Typography variant="h3" passColor>
              Отправить заявку
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfoAboutOrganizationModal;
