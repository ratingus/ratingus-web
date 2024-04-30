"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import Avatar from "@/entity/User/ui/Avatar";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Registration() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className={styles.main}>
      <Typography variant="h3">Регистрация</Typography>
      <div className={styles.form}>
        <div className={styles.mainInfoForm}>
          <Avatar size={64} />
          <div className={styles.baseInputs}>
            <Input className={styles.baseInput} placeholder="Логин" />
            <Input
              className={styles.baseInput}
              placeholder="Пароль"
              type="password"
            />
          </div>
        </div>
        <div className={styles.miniForm}>
          <Input placeholder="Фамилия" />
          <Input placeholder="Имя" />
        </div>
        <div className={styles.miniForm}>
          <Input placeholder="Отчество" />
          <Input placeholder="Дата рождения" type="date" />
        </div>
        <Button
          className={styles.button}
          variant="important"
          onClick={handleLogin}
        >
          Регистрация
        </Button>
      </div>
      <Link className={styles.button} href={"/login"} passHref>
        <Button className={styles.button} variant="secondary">
          Вход
        </Button>
      </Link>
    </div>
  );
}
