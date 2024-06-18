"use client";

import React, { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./EnterCodeModal.module.scss";

import { useEnterCodeMutation } from "@/entity/User/query";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { actionHideModal } from "@/shared/components/Modal/slice";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";
import { useAppDispatch } from "@/shared/hooks/rtk";

const EnterCodeModal = () => {
  const dispatch = useAppDispatch();
  const form = useRef(null);
  const [enterCode] = useEnterCodeMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const code = getFromForm(formData, "code");
      if (!!code) {
        yaMetricaEvent(
          "Отправлен запрос на подключение пользователя к организации",
        );
        enterCode({ code }).then((r) => {
          // @ts-ignore
          if (r?.error || r?.error?.status === 400) {
            toast("Неверный код приглашения", {
              type: "error",
            });
          } else if (r) {
            dispatch(actionHideModal());
            yaMetricaEvent("Пользователь добавлен в организацию");
          }
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
            onBlur={() => yaMetricaEvent("Ввести код организации")}
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
