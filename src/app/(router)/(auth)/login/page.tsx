"use client";
import { FormEventHandler, useRef } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import styles from "./page.module.scss";

import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";
import { getFromForm } from "@/shared/helpers/strings";

export default function Login() {
  const router = useRouter();
  const form = useRef(null);
  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      try {
        const login = getFromForm(formData, "login");
        const password = getFromForm(formData, "pass");
        const response = await signIn("credentials", {
          login: login,
          password: password,
          redirect: false,
        });
        if (!response) throw new Error("");
        if (response.status === 401) {
          toast("Неверный логин или пароль", {
            type: "error",
          });
        } else if (response.status === 200) {
          router.push("/profile");
        }
      } catch (e) {
        toast("Что-то пошло не так, повторите попытку позже", {
          type: "error",
        });
      }
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
        <Input
          form="login"
          name="login"
          placeholder="Логин"
          onChange={({ target }) => {
            target.value = target.value.replace(/\s+/g, "");
          }}
        />
        <Input
          form="login"
          name="pass"
          placeholder="Пароль"
          type="password"
          onChange={({ target }) => {
            target.value = target.value.replace(/\s+/g, "");
          }}
        />
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
