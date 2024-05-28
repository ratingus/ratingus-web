"use client";
import React, { FormEvent } from "react";

import styles from "./CreateAnnouncement.module.scss";

import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Select } from "@/shared/components/Select/Select";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";
import { useUser } from "@/shared/hooks/useUser";

type CreateAnnouncementProps = {};

const options = [
  {
    value: "-1",
    label: "Всем",
  },
  {
    value: "0",
    label: "Класс 9а",
  },
  {
    value: "1",
    label: "Класс 9б",
  },
];

const CreateAnnouncement = ({}: CreateAnnouncementProps) => {
  const { user } = useUser();
  console.log(user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <article className={styles.base}>
      <header className={styles.header}>
        <div className={styles.for}>
          <Typography component="span" color="textHelper">
            От кого:
          </Typography>
          <Typography component="span" color="textPrimary">
            {user.fio}
          </Typography>
        </div>
        <div className={styles.for}>
          <Typography component="span" color="textHelper">
            Для кого:
          </Typography>{" "}
          <Select multiple options={options} />
        </div>
      </header>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Typography
          variant="h1"
          component="div"
          className={styles.inputWrapper}
        >
          <Input
            type="text"
            sizeVariant="big"
            variant="dark"
            placeholder="Введите название объявления..."
            className={styles.input}
          />
        </Typography>
        <Textarea
          variant="dark"
          placeholder="Введите текст объявления"
          className={styles.textarea}
        />
        <div className={styles.buttons}>
          <Button type="reset" className={styles.button}>
            Отменить
          </Button>
          <Button type="submit" className={styles.button}>
            Готово
          </Button>
        </div>
      </form>
    </article>
  );
};

export default CreateAnnouncement;
