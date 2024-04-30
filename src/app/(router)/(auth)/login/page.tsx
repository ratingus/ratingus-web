"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    Cookies.set("isLogged", "true");
    router.push("/");
  };

  return (
    <div className={styles.main}>
      <Typography variant="h3">Вход в систему</Typography>
      <div className={styles.form}>
        <Input placeholder="Логин" />
        <Input placeholder="Пароль" type="password" />
        <Button
          className={styles.button}
          variant="important"
          onClick={handleLogin}
        >
          Вход
        </Button>
      </div>
      <Link className={styles.button} href={"/registration"} passHref>
        <Button className={styles.button} variant="secondary">
          Регистрация
        </Button>
      </Link>
    </div>
  );
}
