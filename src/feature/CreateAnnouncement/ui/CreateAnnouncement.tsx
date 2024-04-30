"use client";
import React, { FormEvent } from "react";

import styles from "./CreateAnnouncement.module.scss";

import { useUser } from "@/entity/User/hooks";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Select } from "@/shared/components/Select/Select";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";

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
  const { fio } = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <article className={styles.base}>
      <header className={styles.header}>
        <div>
          <Typography component="span" color="textHelper">
            От кого:
          </Typography>
          <Typography component="span" color="textPrimary">
            {fio}
          </Typography>
        </div>
        <div>
          <Typography component="span" color="textHelper">
            Для кого:
          </Typography>
          <div>
            <Select multiple options={options} />
          </div>
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