"use client";

import React, { FormEventHandler, useMemo, useRef, useState } from "react";
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
import { getFromForm } from "@/shared/helpers/strings";
import { yaMetricaEvent } from "@/shared/helpers/yaMetrica";

const Users = () => {
  const { data: users } = useGetUsersQuery(null);
  const { data: userCodes = [] } = useGetUserCodesQuery(null);
  const { data: classes = [] } = useGetClassesQuery(null);

  const [createUserCode] = useCreateUserCodeMutation();

  const [chosenUser, setChosenUser] = useState<UserRoleDto | null>();

  const form = useRef(null);

  const [selectedRole, setSelectedRole] = useState("STUDENT");

  const [searchUser, setSearchUser] = useState("");

  const filtredUsers = useMemo(() => {
    return (users ?? []).filter(({ login, name, surname, patronymic, fio }) => {
      const searchUserLower = searchUser.toLowerCase();
      return (
        fio.toLowerCase().startsWith(searchUserLower) ||
        surname.toLowerCase().startsWith(searchUserLower) ||
        patronymic?.toLowerCase().startsWith(searchUserLower) ||
        name.toLowerCase().startsWith(searchUserLower) ||
        login.toLowerCase().startsWith(searchUserLower)
      );
    });
  }, [users, searchUser]);

  if (!users) return <div>loading...</div>;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const name = getFromForm(formData, "name");
      const surname = getFromForm(formData, "surname");
      const patronymic = getFromForm(formData, "patronymic") || undefined;
      const role = getFromForm(formData, "role") as RoleEnum | null;
      const classId = getFromForm(formData, "class");
      if (!name || !surname || !role) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
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
      }).then(() => {
        yaMetricaEvent("Cгенерировать код приглашения");
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
        <Input
          className={styles.search}
          value={searchUser}
          placeholder="Введите логин или ФИО..."
          onChange={({ target }) => setSearchUser(target.value)}
        />
        <ul className={styles.list}>
          {filtredUsers.map(({ id, login, birthdate, ...user }) => (
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
                  <Typography variant="body" className={styles.bigText}>
                    {login}
                  </Typography>
                  <Typography variant="body" className={styles.bigText}>
                    {getFioByUser(user)}
                  </Typography>
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

      <div
        className={cl(styles.main, chosenUser === null && styles.mainOverflow)}
      >
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
                <div className={styles.formButtons}>
                  <div className={styles.formBlock}>
                    <Typography variant="h3">Роль:</Typography>
                    <div>
                      <Select
                        form="addUser"
                        name="role"
                        variant="dark"
                        // @ts-ignore
                        onChange={({ value }) => setSelectedRole(value)}
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
                  {selectedRole === "STUDENT" && (
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
                </div>
                <Button className={styles.formButton} variant="secondary">
                  Добавить
                </Button>
              </form>
              <Typography className={styles.codes} variant="h4">
                Не активированные коды приглашения:
              </Typography>
              <Typography className={styles.codesPanel}>
                {userCodes
                  .filter(({ role }) => role === selectedRole)
                  .map(({ classDto, code, ...user }, index) => (
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
