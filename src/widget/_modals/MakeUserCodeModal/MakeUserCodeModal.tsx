"use client";

import React, { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./MakeUserCodeModal.module.scss";

import { UserCode } from "@/entity/School/model";
import { UserIdentity } from "@/entity/User/model";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { actionHideModal } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";
import { useAppDispatch } from "@/shared/hooks/rtk";

type Props = {
  onSubmit: (user: Omit<UserIdentity, "id">) => void;
  code: UserCode | null;
};

const MakeUserCodeModal = ({ onSubmit, code }: Props) => {
  const dispatch = useAppDispatch();
  const form = useRef(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const name = getFromForm(formData, "name");
      const surname = getFromForm(formData, "surname");
      const patronymic = getFromForm(formData, "patronymic") || undefined;
      if (name && surname) {
        onSubmit({
          name,
          surname,
          patronymic,
        });
        dispatch(actionHideModal());
      } else {
        toast("Не все поля заполнены!", {
          type: "error",
        });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2">Введите фио локального админа:</Typography>
      <form
        id="makeUserCode"
        className={styles.form}
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className={styles.formContent}>
          <Input
            form="makeUserCode"
            name="name"
            variant="dark"
            defaultValue={code?.name}
            placeholder="Введите имя..."
          />
          <Input
            form="makeUserCode"
            name="surname"
            variant="dark"
            defaultValue={code?.surname}
            placeholder="Введите фамилию..."
          />
          <Input
            form="makeUserCode"
            name="patronymic"
            variant="dark"
            defaultValue={code?.patronymic}
            placeholder="Введите отчество..."
          />
        </div>

        <Button variant="important">
          <Typography variant="h3" passColor>
            Создать
          </Typography>
        </Button>
      </form>
    </div>
  );
};

export default MakeUserCodeModal;
