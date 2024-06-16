"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./SubjectSelector.module.scss";

import { actionSetSelectedTeacherId } from "@/entity/Lesson/store/journal/slice";
import { useGetTeacherSubjectsQuery } from "@/entity/Schedule/query";
import { getFioByUser } from "@/entity/User/helpers";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { useAppDispatch } from "@/shared/hooks/rtk";

const SubjectSelector = () => {
  const { data: subjects } = useGetTeacherSubjectsQuery(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const teacherSubjectFromParams = Number(searchParams.get("teacherSubject"));
  const teacherSubject =
    teacherSubjectFromParams ||
    (subjects &&
      subjects[0] &&
      subjects[0].teachers &&
      subjects[0].teachers[0] &&
      subjects[0].teachers[0].teacherSubjectId) ||
    -1;

  if (teacherSubjectFromParams < 0) {
    router.push(
      `${path}?${addQueryInParamsString(searchParams, { name: "teacherSubject", value: teacherSubject })}`,
    );
  }
  if (teacherSubject === -1) {
    router.push(
      `${path}?${addQueryInParamsString(searchParams, { name: "teacherSubject", value: 0 })}`,
    );
  }

  if (!subjects) return <div>loading...</div>;

  const teacherSubjects = subjects.flatMap(
    ({ subject, teachers }) =>
      teachers?.map((teacher) => ({ subject, teacher })) || [],
  );
  const options = teacherSubjects.map(
    ({ subject: { name }, teacher: { teacherSubjectId, ...teacher } }) => ({
      label: name + " (" + getFioByUser(teacher) + ")",
      value: teacherSubjectId.toString(),
    }),
  );
  const currentSubject = teacherSubjects.find(
    ({ teacher: { teacherSubjectId } }) => teacherSubjectId === teacherSubject,
  );

  if (teacherSubject > 0) {
    dispatch(actionSetSelectedTeacherId(currentSubject?.teacher.id || null));
  }

  return (
    <div>
      <Typography variant="h4" className={styles.label}>
        Предмет
      </Typography>
      {currentSubject && (
        <Select
          variant="dark"
          // @ts-ignore
          defaultValue={{
            label:
              currentSubject.subject.name +
              " (" +
              getFioByUser(currentSubject.teacher) +
              ")",
            value: currentSubject.teacher.teacherSubjectId.toString(),
          }}
          onChange={({ value }) => {
            router.push(
              path +
                `?${addQueryInParamsString(searchParams, { name: "teacherSubject", value: value })}`,
            );
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default SubjectSelector;
