"use client";
import React, { FormEvent, useRef } from "react";

import styles from "./CreateAnnouncement.module.scss";

import { usePostAnnouncementMutation } from "@/entity/Announcement/query";
import { Class } from "@/entity/School/model";
import { useGetClassesQuery } from "@/entity/School/query";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Select } from "@/shared/components/Select/Select";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";
import { useUser } from "@/shared/hooks/useUser";

type CreateAnnouncementProps = {};

const CreateAnnouncement = ({}: CreateAnnouncementProps) => {
  const { fio } = useUser();
  const [createPost] = usePostAnnouncementMutation();
  const { data: classes } = useGetClassesQuery(null);
  const form = useRef(null);
  const selectRef = useRef();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && selectRef.current) {
      const formData = new FormData(form.current);
      // @ts-ignore
      const classes = selectRef.current.state.selectValue.map(
        // @ts-ignore
        ({ value, label }) => ({
          id: parseInt(value),
          name: label,
        }),
      ) as Class[];
      await createPost({
        name: formData.get("name") as string,
        content: formData.get("content") as string,
        classes,
      });
      yaMetricaEvent("Создать объявление");
      handleReset();
    }
  };

  const handleReset = () => {
    // @ts-ignore
    if (selectRef.current) selectRef.current.clearValue();
    // @ts-ignore
    if (form.current) form.current.reset();
  };

  const options =
    classes?.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  return (
    <form
      className={styles.base}
      ref={form}
      id="createAnnouncement"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <header className={styles.header}>
        <div className={styles.for}>
          <Typography component="span" color="textHelper">
            От кого:
          </Typography>
          <Typography component="span" color="textPrimary">
            {fio}
          </Typography>
        </div>
        <div className={styles.for}>
          <Typography component="span" color="textHelper">
            Для кого:
          </Typography>{" "}
          {/*@ts-ignore*/}
          <Select ref={selectRef} multiple options={options} />
        </div>
      </header>
      <div className={styles.form}>
        <Typography
          variant="h1"
          component="div"
          className={styles.inputWrapper}
        >
          <Input
            form="createAnnouncement"
            name="name"
            type="text"
            sizeVariant="big"
            variant="dark"
            placeholder="Введите название объявления..."
            className={styles.input}
          />
        </Typography>
        <Textarea
          form="createAnnouncement"
          name="content"
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
      </div>
    </form>
  );
};

export default CreateAnnouncement;
