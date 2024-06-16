"use client";

import React, { FormEventHandler, useRef, useState } from "react";
import { toast } from "react-toastify";
import cl from "classnames";

import styles from "./Users.module.scss";

import { useGetClassesQuery } from "@/entity/School/query";
import MiniSchoolCardRole from "@/entity/School/ui/MiniSchoolCardRole";
import {
  getFioByUser,
  getRoleByType,
  getUserBirthdate,
} from "@/entity/User/helpers";
import { RoleEnum, UserRoleDto } from "@/entity/User/model";
import {
  useCreateUserCodeMutation,
  useGetUserCodesQuery,
  useGetUsersQuery,
} from "@/entity/User/query";
import Avatar from "@/entity/User/ui/Avatar";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";

const Users = () => {
  const { data: users } = useGetUsersQuery(null);
  const { data: userCodes = [] } = useGetUserCodesQuery(null);
  const { data: classes = [] } = useGetClassesQuery(null);

  const [createUserCode] = useCreateUserCodeMutation();

  const [chosenUser, setChosenUser] = useState<UserRoleDto | null>();

  const form = useRef(null);

  const [role, setRole] = useState("student");

  if (!users) return <div>loading...</div>;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const formName = formData.get("name");
      const formSurname = formData.get("surname");
      const formPatronymic = formData.get("patronymic");
      const formRole = formData.get("role");
      const formClass = formData.get("class");
      if (!formName || !formSurname || !formRole) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      const name = formName.toString();
      const surname = formSurname.toString();
      const patronymic = formPatronymic?.toString();
      const role = formRole.toString() as RoleEnum;
      const classId = formClass?.toString();
      const cl = classId
        ? classes.find(({ id }) => id === parseInt(classId))
        : undefined;

      if (role === RoleEnum.STUDENT && !cl) {
        toast("Не выбран класс для ученика!", {
          type: "error",
        });
        return;
      }
      createUserCode({
        name,
        surname,
        patronymic,
        role,
        classDto: cl || null,
      });
    }
  };

  const handleChooseUser = (userId: number) => {
    setChosenUser(users.find(({ id }) => id === userId));
  };

  const handleAddUser = () => {
    setChosenUser(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {users.map(({ id, login, birthdate, ...user }) => (
            <li key={id} className={styles.userWrapper}>
              <Button
                variant="ghost"
                className={cl(
                  styles.user,
                  id === chosenUser?.id && styles.active,
                )}
                onClick={() => handleChooseUser(id)}
              >
                <Avatar avatarClassName={styles.avatar} size={64} />
                <div className={styles.userDetails}>
                  {user.school && (
                    <Typography variant="caption" color="textHelper">
                      [{getRoleByType(user.school.role)}]
                    </Typography>
                  )}
                  <Typography variant="body">{login}</Typography>
                  <Typography variant="body">{getFioByUser(user)}</Typography>
                  <Typography variant="small" color="textHelper">
                    {getUserBirthdate(birthdate.toString())}
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
            {chosenUser.school && <MiniSchoolCardRole {...chosenUser.school} />}
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
                      // @ts-ignore
                      onChange={({ value }) => setRole(value)}
                      // @ts-ignore
                      defaultValue={{ value: "STUDENT", label: "Ученик" }}
                      options={[
                        { value: "STUDENT", label: "Ученик" },
                        { value: "TEACHER", label: "Учитель" },
                        { value: "LOCAL_ADMIN", label: "Локальный админ" },
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
                        options={classes.map(({ id, name }) => ({
                          value: id.toString(),
                          label: name,
                        }))}
                      />
                    </div>
                  </div>
                )}
                <Button className={styles.formButton} variant="secondary">
                  Добавить
                </Button>
              </form>
              <Typography className={styles.codes} variant="h4">
                Не активированные коды приглашения:
              </Typography>
              <Typography className={styles.codesPanel}>
                {userCodes.map(({ classDto, code, ...user }) => (
                  <div className={styles.code} key={code}>
                    <Typography variant="h5">
                      {getFioByUser(user)}
                      {classDto && `, Класс ${classDto.name}`}
                    </Typography>
                    <Typography variant="h5" color="textHelper">
                      {code}
                    </Typography>
                  </div>
                ))}
              </Typography>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Users;
