"use client";
import React, { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import styles from "./page.module.scss";

import Avatar from "@/entity/User/ui/Avatar";
import api from "@/shared/api/axios";
import Button from "@/shared/components/Button/Button";
import { Checkbox } from "@/shared/components/Checkbox";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";

export default function Registration() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const form = useRef(null);
  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);

      const birthdate = getFromForm(formData, "birthDate");
      const login = getFromForm(formData, "login");
      const password = getFromForm(formData, "pass");
      const name = getFromForm(formData, "name");
      const surname = getFromForm(formData, "surname");
      const patronymic = getFromForm(formData, "patronymic");
      const isLegalRulesAccepted = Boolean(
        formData.get("isLegalRulesAccepted")?.toString() || "",
      );

      if (!login || !password || !name || !surname || !birthdate) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (
        password !== password.replace(/[^\da-zA-Z]/g, "") ||
        login !== login.replace(/[^\da-zA-Z]/g, "")
      ) {
        toast("Только латинские буквы и цифры!", {
          type: "error",
        });
        return;
      }
      const birthDate = new Date(birthdate);
      if (birthDate.getFullYear() < 1900 || birthDate.getFullYear() > 2020) {
        toast("Некорректная дата рождения", {
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
      try {
        await api.post("/auth/register", {
          name,
          surname,
          patronymic,
          birthDate: new Date(birthDate),
          login,
          password,
        });
        const response = await signIn("credentials", {
          login,
          password,
          redirect: false,
        });
        if (!response) throw new Error("");
        if (response.status === 401) {
          handleLogin();
        } else if (response.status === 200) {
          router.push("/profile");
        }
      } catch (e) {
        console.log(e);
        toast("Такой пользователь уже существует", {
          type: "error",
        });
      }
    }
  };

  return (
    <div className={styles.main}>
      <Typography variant="h3">Регистрация</Typography>
      <form
        id="register"
        ref={form}
        onSubmit={handleRegister}
        className={styles.form}
      >
        <div className={styles.mainInfoForm}>
          <Avatar size={64} />
          <div className={styles.baseInputs}>
            <Input
              form="register"
              name="login"
              className={styles.baseInput}
              placeholder="Логин"
            />
            <Input
              form="register"
              name="pass"
              className={styles.baseInput}
              placeholder="Пароль"
              type="password"
            />
          </div>
        </div>
        <div className={styles.miniForm}>
          <Input form="register" name="surname" placeholder="Фамилия" />
          <Input form="register" name="name" placeholder="Имя" />
        </div>
        <div className={styles.miniForm}>
          <Input form="register" name="patronymic" placeholder="Отчество" />
          <Input
            form="register"
            name="birthDate"
            placeholder="Дата рождения"
            type="date"
            max="2020-01-01"
          />
        </div>
        <div className={styles.miniForm}>
          <Checkbox form="register" name="isLegalRulesAccepted" />
          <Typography className={styles.miniFormText} variant="body">
            Я согласен с{" "}
            <Link href="/privacy.pdf" target="_blank">
              “Пользовательским соглашением”
            </Link>
          </Typography>
        </div>
        <Button className={styles.button} variant="important">
          Регистрация
        </Button>
      </form>
      <Link className={styles.button} href={"/login"} passHref>
        <Button className={styles.button} variant="secondary">
          Вход
        </Button>
      </Link>
    </div>
  );
}
