"use client";
import React, { FormEventHandler, useRef, useState } from "react";

import styles from "./Users.module.scss";

import { classes } from "@/entity/School/mock";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

const Classes = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [choosenClassIndex, setChoosenClassIndex] = useState<number>();

  const form = useRef(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
    }
  };

  const handleAddClassClick = () => {
    setChoosenClassIndex(undefined);
    setIsActive(true);
  };

  const handleChangeClassClick = (index: number) => {
    setChoosenClassIndex(index);
    setIsActive(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {classes.map(({ id, name }, index) => (
            <li key={id} className={styles.roleWrapper}>
              <Label
                className={styles.role}
                variant={index === choosenClassIndex ? "primary" : "secondary"}
                onClick={() => handleChangeClassClick(index)}
              >
                {name}
              </Label>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          isActive={isActive}
          onClick={handleAddClassClick}
        >
          Добавить роль
        </Button>
      </div>

      <div className={styles.main}>
        {isActive ? (
          <div>
            <form
              id="addRole"
              className={styles.form}
              ref={form}
              onSubmit={handleSubmit}
            >
              <div className={styles.formBlock}>
                <Typography variant="h3">Название класса:</Typography>
                <div className={styles.formBlockWithInputs}>
                  <Input
                    form="addRole"
                    name="class"
                    variant="dark"
                    placeholder="Название класса"
                  />
                </div>
              </div>
              <Button className={styles.formButton} variant="secondary">
                Добавить
              </Button>
            </form>
          </div>
        ) : (
          choosenClassIndex !== undefined && (
            <div>
              <form
                id="addRole"
                className={styles.form}
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className={styles.formBlock}>
                  <Typography variant="h3">Название класса:</Typography>
                  <div className={styles.formBlockWithInputs}>
                    <Input
                      key={choosenClassIndex}
                      form="addRole"
                      name="class"
                      variant="dark"
                      placeholder="Название класса"
                      defaultValue={classes[choosenClassIndex].name}
                    />
                  </div>
                </div>
                <Button className={styles.formButton} variant="secondary">
                  Изменить
                </Button>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Classes;
