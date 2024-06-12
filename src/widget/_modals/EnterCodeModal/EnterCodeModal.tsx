"use client";

import React, { FormEventHandler, useRef } from "react";

import styles from "./EnterCodeModal.module.scss";

import { useEnterCodeMutation } from "@/entity/User/query";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { actionHideModal } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { useAppDispatch } from "@/shared/hooks/rtk";

const EnterCodeModal = () => {
  const dispatch = useAppDispatch();
  const form = useRef(null);
  const [enterCode] = useEnterCodeMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const formCode = formData.get("code");
      if (formCode) {
        const code = formCode.toString();
        enterCode({ code }).then(() => {
          dispatch(actionHideModal());
        });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2">Код приглашения</Typography>
      <form
        id="enterCode"
        className={styles.form}
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className={styles.formContent}>
          <Input
            form="enterCode"
            name="code"
            variant="dark"
            placeholder="Введите код..."
          />
        </div>

        <Button variant="important">
          <Typography variant="h3" passColor>
            Ввести
          </Typography>
        </Button>
      </form>
    </div>
  );
};

export default EnterCodeModal;
