"use client";

import React, { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./EditProfileModal.module.scss";

import { useEditProfileMutation } from "@/entity/User/query";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { actionHideModal } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";
import { useAppDispatch } from "@/shared/hooks/rtk";

const EditProfileModal = () => {
  const dispatch = useAppDispatch();
  const [editProfile] = useEditProfileMutation();
  const form = useRef(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const birthdate = getFromForm(formData, "birthDate");
      const name = getFromForm(formData, "name");
      const surname = getFromForm(formData, "surname");
      const patronymic = getFromForm(formData, "patronymic");
      if (!name || !birthdate || !surname) {
        toast("Обязательно должна быть дата рождения", {
          type: "error",
        });
        return;
      }
      const birthDate = new Date(birthdate);
      if (birthDate.getFullYear() < 1900 || birthDate.getFullYear() > 2018) {
        toast("Некорректная дата рождения", {
          type: "error",
        });
        return;
      }
      await editProfile({
        name,
        surname,
        patronymic,
        birthDate: new Date(birthDate),
      });
      dispatch(actionHideModal());
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2">Профиль</Typography>
      <form
        id="enterCode"
        className={styles.form}
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className={styles.formContent}>
          <div className={styles.miniForm}>
            <Input name="surname" placeholder="Фамилия" />
            <Input name="name" placeholder="Имя" />
          </div>
          <div className={styles.miniForm}>
            <Input name="patronymic" placeholder="Отчество" />
            <Input
              name="birthDate"
              placeholder="Дата рождения"
              type="date"
              max="2024-01-01"
            />
          </div>
        </div>

        <Button variant="important">
          <Typography variant="h3" passColor>
            Изменить
          </Typography>
        </Button>
      </form>
    </div>
  );
};

export default EditProfileModal;
