"use client";
import React, { FormEventHandler, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Users.module.scss";

import { TeacherSubjects } from "@/entity/Schedule/model";
import {
  useAddSubjectMutation,
  useGetTeacherSubjectsQuery,
  useUpdateSubjectMutation,
} from "@/entity/Schedule/query";
import { getFioByUser } from "@/entity/User/helpers";
import Button from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input/Input";
import { Label } from "@/shared/components/Label/Label";
import { Typography } from "@/shared/components/Typography/Typography";

const Subjects = () => {
  const { data: subjects = [] } = useGetTeacherSubjectsQuery(null);
  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chosenSubject, setChosenSubject] = useState<TeacherSubjects>();

  const addSubjectForm = useRef(null);
  const handleAddSubjectSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (addSubjectForm.current) {
      const formData = new FormData(addSubjectForm.current);
      const name = formData.get("subject")?.toString();
      if (!name) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (subjects.find(({ subject }) => subject.name === name)) {
        toast("Имена предметов не должны совпадать!", {
          type: "error",
        });
        return;
      }
      addSubject({
        name,
      });
    }
  };
  const updateSubjectForm = useRef(null);
  const handleUpdateSubjectSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (updateSubjectForm.current) {
      const formData = new FormData(updateSubjectForm.current);
      const name = formData.get("subject")?.toString();
      if (!chosenSubject || !name) {
        toast("Не все поля заполнены!", {
          type: "error",
        });
        return;
      }
      if (name === chosenSubject.subject.name) {
        toast("Имена предметов не должны совпадать!", {
          type: "error",
        });
        return;
      }
      updateSubject({
        id: chosenSubject.subject.id,
        name,
      });
    }
  };

  const handleAddSubjectClick = () => {
    setChosenSubject(undefined);
    setIsActive(true);
  };

  const handleChangeSubjectClick = (subjectDto: TeacherSubjects) => {
    setChosenSubject(subjectDto);
    setIsActive(false);
  };

  const [searchSubject, setSearchSubject] = useState("");

  const filtredSubjects = useMemo(() => {
    return (subjects ?? []).filter(({ subject }) =>
      subject.name.toLowerCase().startsWith(searchSubject.toLowerCase()),
    );
  }, [subjects, searchSubject]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <Input
          className={styles.search}
          value={searchSubject}
          placeholder="Введите название предмета..."
          onChange={({ target }) => setSearchSubject(target.value)}
        />
        <ul className={styles.list}>
          {filtredSubjects.map(({ subject: { id, name } }, index) => (
            <li key={id} className={styles.roleWrapper}>
              <Label
                className={styles.role}
                variant={
                  id === chosenSubject?.subject.id ? "primary" : "secondary"
                }
                onClick={() => handleChangeSubjectClick(filtredSubjects[index])}
              >
                {name}
              </Label>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          isActive={isActive}
          onClick={handleAddSubjectClick}
        >
          Добавить предмет
        </Button>
      </div>

      <div className={styles.main}>
        {isActive ? (
          <div>
            <form
              id="addSubject"
              className={styles.form}
              ref={addSubjectForm}
              onSubmit={handleAddSubjectSubmit}
            >
              <div className={styles.formBlock}>
                <Typography variant="h3">Название предмета:</Typography>
                <div className={styles.formBlockWithInputs}>
                  <Input
                    form="addSubject"
                    name="subject"
                    variant="dark"
                    placeholder="Название предмета"
                  />
                </div>
              </div>
              <Button className={styles.formButton} variant="secondary">
                Добавить
              </Button>
            </form>
          </div>
        ) : (
          !!chosenSubject && (
            <div>
              <form
                id="updateSubject"
                className={styles.form}
                ref={updateSubjectForm}
                onSubmit={handleUpdateSubjectSubmit}
              >
                <div className={styles.formBlock}>
                  <Typography variant="h3">Название предмета:</Typography>
                  <div className={styles.formBlockWithInputs}>
                    <Input
                      key={chosenSubject.subject.id}
                      form="updateSubject"
                      name="subject"
                      variant="dark"
                      placeholder="Название предмета"
                      defaultValue={chosenSubject.subject.name}
                    />
                  </div>
                </div>
                <Button className={styles.formButton} variant="secondary">
                  Изменить
                </Button>
              </form>
              <div>
                <Typography variant="h4">
                  Учителя, ведущие этот предмет:
                </Typography>
                <ul>
                  {chosenSubject.teachers?.map(
                    ({ teacherSubjectId, ...teacher }) => (
                      <li key={teacherSubjectId}>{getFioByUser(teacher)}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Subjects;
