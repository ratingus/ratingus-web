"use client";
import { FormEventHandler, useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import styles from "./page.module.scss";

import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Login() {
  const form = useRef(null);
  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      await signIn("credentials", {
        login: formData.get("login"),
        password: formData.get("pass"),
        redirect: true,
        callbackUrl: "/profile",
      });
    }
  };

  return (
    <div className={styles.main}>
      <Typography variant="h3">Вход в систему</Typography>
      <form
        ref={form}
        id="login"
        className={styles.form}
        onSubmit={handleLogin}
      >
        <Input form="login" name="login" placeholder="Логин" />
        <Input form="login" name="pass" placeholder="Пароль" type="password" />
        <Button form="login" className={styles.button} variant="important">
          Вход
        </Button>
      </form>
      <Link className={styles.button} href={"/registration"} passHref>
        <Button className={styles.button} variant="secondary">
          Регистрация
        </Button>
      </Link>
    </div>
  );
}
