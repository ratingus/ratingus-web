"use client";

import React, { FormEventHandler, useRef, useState } from "react";
import cl from "classnames";

import styles from "./Users.module.scss";

import MiniSchoolCardRole from "@/entity/School/ui/MiniSchoolCardRole";
import { getFioByUser, getUserBirthdate } from "@/entity/User/helpers";
import { UserRole } from "@/entity/User/model";
import Avatar from "@/entity/User/ui/Avatar";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";

const Users = () => {
  const users: UserRole[] = [
    // @ts-ignore
    {
      id: 1,
      login: "Логин",
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userRole: {
        role: "Ученик",
        classes: ["Класс 9а"],
      },
      birthdate: new Date(Date.UTC(2002, 2, 12)),
    },
    // @ts-ignore
    {
      id: 2,
      login: "Логин",
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userRole: {
        role: "Ученик",
        classes: ["Класс 8а"],
      },
      birthdate: new Date(Date.UTC(2002, 2, 12)),
    },
    // @ts-ignore
    {
      id: 3,
      login: "Логин",
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userRole: {
        role: "Ученик",
        classes: ["Скрипка", "Хор"],
      },
      birthdate: new Date(Date.UTC(2002, 2, 12)),
    },
  ];

  const userCodes = [
    {
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userClass: "9а",
      code: "favof8129fhaxf",
    },
    {
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userClass: "9а",
      code: "fasfqw@FSaxz",
    },
    {
      name: "Имя",
      surname: "Фамилия",
      patronymic: "Отчество",
      userClass: "11",
      code: "PXFOMXzfq29",
    },
  ];

  const [chosenUser, setChosenUser] = useState<UserRole | undefined | null>();

  const handleChooseUser = (userId: number) => {
    setChosenUser(users.find(({ id }) => id === userId));
  };

  const handleAddUser = () => {
    setChosenUser(null);
  };

  const form = useRef(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      console.log(formData.get("name"));
      console.log(formData.get("surname"));
      console.log(formData.get("patronymic"));
      console.log(formData.get("role"));
      console.log(formData.get("class"));
    }
  };

  const [role, setRole] = useState("student");

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {users.map(({ id, login, name, surname, patronymic, birthdate }) => (
            <li key={id} className={styles.userWrapper}>
              <Button
                variant="ghost"
                className={styles.user}
                onClick={() => handleChooseUser(id)}
              >
                <Avatar avatarClassName={styles.avatar} size={64} />
                <div className={styles.userDetails}>
                  <Typography variant="body">{login}</Typography>
                  <Typography variant="body">
                    {getFioByUser({ name, surname, patronymic })}
                  </Typography>
                  <Typography variant="small" color="textHelper">
                    {getUserBirthdate(birthdate)}
                  </Typography>
                </div>
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          isActive={chosenUser === null}
          onClick={handleAddUser}
        >
          Добавить пользователя
        </Button>
      </div>

      <div className={styles.main}>
        {chosenUser ? (
          <div>
            <div className={cl(styles.user, styles.bigUser)}>
              <Avatar size={128} />
              <div className={styles.userDetails}>
                <Typography variant="h3">{chosenUser.login}</Typography>
                <Typography variant="h3">{getFioByUser(chosenUser)}</Typography>
                <Typography variant="h5" color="textHelper">
                  {getUserBirthdate(chosenUser.birthdate)}
                </Typography>
              </div>
            </div>
            {/*// @ts-ignore*/}
            <MiniSchoolCardRole {...chosenUser.userRole} />
          </div>
        ) : (
          chosenUser === null && (
            <div>
              <form
                id="addUser"
                className={styles.form}
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className={styles.formBlock}>
                  <Typography variant="h3">ФИО пользователя:</Typography>
                  <div className={styles.formBlockWithInputs}>
                    <Input
                      form="addUser"
                      name="surname"
                      placeholder="Фамилия"
                    />
                    <Input form="addUser" name="name" placeholder="Имя" />
                    <Input
                      form="addUser"
                      name="patronymic"
                      placeholder="Отчество"
                    />
                  </div>
                </div>
                <div className={styles.formBlock}>
                  <Typography variant="h3">Роль:</Typography>
                  <div>
                    <Select
                      form="addUser"
                      name="role"
                      variant="dark"
                      onChange={(value) => setRole(value.value)}
                      // @ts-ignore
                      defaultValue={{ value: "student", label: "Ученик" }}
                      options={[
                        { value: "student", label: "Ученик" },
                        { value: "teacher", label: "Учитель" },
                        { value: "admin", label: "Локальный админ" },
                      ]}
                    />
                  </div>
                </div>
                {role === "student" && (
                  <div className={styles.formBlock}>
                    <Typography variant="h3">Класс:</Typography>
                    <div>
                      <Select
                        form="addUser"
                        name="class"
                        variant="dark"
                        options={[
                          { value: "9а", label: "9а" },
                          { value: "10а", label: "10а" },
                        ]}
                      />
                    </div>
                  </div>
                )}
                <Button className={styles.formButton} variant="secondary">
                  Добавить
                </Button>
              </form>
              <Typography className={styles.codes} variant="h4">
                Коды приглашения:
              </Typography>
              <>
                {userCodes.map(({ userClass, code, ...user }) => (
                  <Typography key={code} variant="h5">
                    {getFioByUser(user)}, Класс {userClass} {code}
                  </Typography>
                ))}
              </>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Users;
