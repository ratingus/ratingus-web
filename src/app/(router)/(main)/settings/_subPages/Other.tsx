import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import cl from "classnames";

import styles from "./Users.module.scss";

import { getTime } from "@/entity/Announcement/helpers";
import {
  useGetSchoolQuery,
  useUpdateSchoolMutation,
} from "@/entity/School/query";
import Button from "@/shared/components/Button/Button";
import { BaseInputProps, Input } from "@/shared/components/Input/Input";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Typography } from "@/shared/components/Typography/Typography";

const Other = () => {
  const { data: school } = useGetSchoolQuery(null);
  const [updateSchool] = useUpdateSchoolMutation();
  const [isEditing, setIsEditing] = useState(false);

  const textareaName = useRef(null);

  const [name, setName] = useState(school?.name);
  const [address, setAddress] = useState(school?.address);
  const [phone, setPhone] = useState(school?.phone);
  const [email, setEmail] = useState(school?.email);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
      setPhone(school.phone);
      setEmail(school.email);
    }
  }, [school]);

  if (!school) return <div>loading...</div>;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name?.trim() || !address?.trim() || !phone?.trim() || !email?.trim()) {
      toast("Поля не могут быть пустыми", {
        type: "error",
      });
      return;
    }
    updateSchool({
      id: school.id,
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
    }).then((r) => {
      setIsEditing(false);
    });
  };

  return (
    <div className={cl(styles.wrapper, styles.otherWrapper)}>
      <form className={styles.fields} onSubmit={handleSubmit}>
        <div>
          <Typography variant="h2">
            {isEditing ? (
              <Textarea
                className={styles.textArea}
                ref={textareaName}
                autoResizeProperty={{
                  height: true,
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                variant="dark"
              />
            ) : (
              <Typography variant="h2">{school.name}</Typography>
            )}
          </Typography>
        </div>
        <Typography variant="h5">
          <Typography color="textHelper" component="span">
            Адрес:
          </Typography>{" "}
          {isEditing ? (
            <Input
              className={styles.input}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={school.address}
              variant="dark"
            />
          ) : (
            <Typography variant="h5">{school.address}</Typography>
          )}
        </Typography>
        <Typography variant="h5">
          <Typography color="textHelper" component="span">
            Номер телефона:
          </Typography>{" "}
          {isEditing ? (
            <InputMask
              mask="+7 (999) 999 99 99"
              maskChar={null}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              defaultValue={school.phone}
            >
              {/* @ts-ignore */}
              {(inputProps: BaseInputProps) => (
                <Input
                  {...inputProps}
                  name="phone"
                  variant="dark"
                  placeholder="Введите номер телефона..."
                />
              )}
            </InputMask>
          ) : (
            <Typography variant="h5">{school.phone}</Typography>
          )}
        </Typography>
        <Typography variant="h5">
          <Typography color="textHelper" component="span">
            Почта:
          </Typography>{" "}
          {isEditing ? (
            <Input
              className={styles.input}
              defaultValue={school.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              variant="dark"
            />
          ) : (
            <Typography variant="h5">{school.email}</Typography>
          )}
        </Typography>
        <div className={styles.button}>
          {isEditing ? (
            <div className={styles.flex}>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                variant="error"
              >
                Отменить
              </Button>
              <Button variant="secondary">Изменить данные о школе</Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </Button>
          )}
        </div>
      </form>
      <div>
        <div className={styles.dop}>
          <div>
            <Typography variant="h4">Длительность занятий:</Typography>
            <div className={styles.timetableWrapper}>
              {school.timetable.map(
                ({ id, lessonNumber, startTime, endTime }) => (
                  <div key={id} className={styles.timetable}>
                    <div>№{lessonNumber}</div>
                    <div>
                      {" "}
                      {getTime(startTime)} - {getTime(endTime)}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div>
            <Typography variant="h4">Статистика:</Typography>
            <div className={cl(styles.stata)}>
              <Typography variant="h6">
                Количество учеников: {school.totalStudents}
              </Typography>
              <Typography variant="h6">
                Количество учителей: {school.totalTeachers}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
