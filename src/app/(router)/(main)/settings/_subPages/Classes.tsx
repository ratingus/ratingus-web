"use client";
import React, { FormEventHandler, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Users.module.scss";

import { Class } from "@/entity/School/model";
import {
  useCreateClassMutation,
  useGetClassesQuery,
  useUpdateClassMutation,
} from "@/entity/School/query";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

const Classes = () => {
  const { data: classes = [] } = useGetClassesQuery(null);
  const [addClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chosenClass, setChosenClass] = useState<Class>();

  const addClassForm = useRef(null);
  const handleAddClassSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (addClassForm.current) {
      const formData = new FormData(addClassForm.current);
      const name = formData.get("class")?.toString();
      if (!name) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (classes.find((item) => item.name === name)) {
        toast("Имена классов не должны совпадать!", {
          type: "error",
        });
        return;
      }
      addClass({
        name,
      });
    }
  };
  const updateClassForm = useRef(null);
  const handleUpdateClassSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (updateClassForm.current) {
      const formData = new FormData(updateClassForm.current);
      const name = formData.get("class")?.toString();
      if (!chosenClass || !name) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (name === chosenClass.name) {
        toast("Имена классов не должны совпадать!", {
          type: "error",
        });
        return;
      }
      updateClass({
        id: chosenClass.id,
        name,
      });
    }
  };

  const handleAddClassClick = () => {
    setChosenClass(undefined);
    setIsActive(true);
  };

  const handleChangeClassClick = (classDto: Class) => {
    setChosenClass(classDto);
    setIsActive(false);
  };

  const [searchClass, setSearchClass] = useState("");

  const filtredClasses = useMemo(() => {
    return (classes ?? []).filter(({ name }) =>
      name.toLowerCase().startsWith(searchClass.toLowerCase()),
    );
  }, [classes, searchClass]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <Input
          className={styles.search}
          value={searchClass}
          placeholder="Введите название класса..."
          onChange={({ target }) => setSearchClass(target.value)}
        />
        <ul className={styles.list}>
          {filtredClasses.map(({ id, name }) => (
            <li key={id} className={styles.roleWrapper}>
              <Label
                className={styles.role}
                variant={id === chosenClass?.id ? "primary" : "secondary"}
                onClick={() => handleChangeClassClick({ id, name })}
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
          Добавить класс
        </Button>
      </div>

      <div className={styles.main}>
        {isActive ? (
          <div>
            <form
              id="addClass"
              className={styles.form}
              ref={addClassForm}
              onSubmit={handleAddClassSubmit}
            >
              <div className={styles.formBlock}>
                <Typography variant="h3">Название класса:</Typography>
                <div className={styles.formBlockWithInputs}>
                  <Input
                    form="addClass"
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
          !!chosenClass && (
            <div>
              <form
                id="updateClass"
                className={styles.form}
                ref={updateClassForm}
                onSubmit={handleUpdateClassSubmit}
              >
                <div className={styles.formBlock}>
                  <Typography variant="h3">Название класса:</Typography>
                  <div className={styles.formBlockWithInputs}>
                    <Input
                      key={chosenClass.id}
                      form="updateClass"
                      name="class"
                      variant="dark"
                      placeholder="Название класса"
                      defaultValue={chosenClass.name}
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
