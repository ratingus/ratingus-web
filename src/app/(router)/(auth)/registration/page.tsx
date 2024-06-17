"use client";
import { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import styles from "./page.module.scss";

import Avatar from "@/entity/User/ui/Avatar";
import api from "@/shared/api/axios";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";

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
      try {
        await api.post("/auth/register", {
          name: formData.get("name"),
          surname: formData.get("surname"),
          patronymic: formData.get("patronymic"),
          birthDate: formData.get("birthDate"),
          login: formData.get("login"),
          password: formData.get("pass"),
        });
        const response = await signIn("credentials", {
          login: formData.get("login"),
          password: formData.get("pass"),
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
        toast("Что-то пошло не так, повторите попытку позже", {
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
              name="login"
              className={styles.baseInput}
              placeholder="Логин"
            />
            <Input
              name="pass"
              className={styles.baseInput}
              placeholder="Пароль"
              type="password"
            />
          </div>
        </div>
        <div className={styles.miniForm}>
          <Input name="surname" placeholder="Фамилия" />
          <Input name="name" placeholder="Имя" />
        </div>
        <div className={styles.miniForm}>
          <Input name="patronymic" placeholder="Отчество" />
          <Input name="birthDate" placeholder="Дата рождения" type="date" />
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
