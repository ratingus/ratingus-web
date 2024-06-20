"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./SubjectSelector.module.scss";

import {
  actionSetSelectedTeacherId,
  actionSetTeacherSubjectIdLoading,
} from "@/entity/Lesson/store/journal/slice";
import { useGetTeacherSubjectsQuery } from "@/entity/Schedule/query";
import { getFioByUser } from "@/entity/User/helpers";
import { Select } from "@/shared/components/Select/Select";
import { Typography } from "@/shared/components/Typography/Typography";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { useAppDispatch } from "@/shared/hooks/rtk";
import { useUser } from "@/shared/hooks/useUser";

const SubjectSelector = () => {
  const { data: subjects } = useGetTeacherSubjectsQuery(null);
  const { userRoleId } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const teacherSubjectFromParams = Number(searchParams.get("teacherSubject"));
  const teacherSubject =
    teacherSubjectFromParams ||
    subjects
      ?.find((subject) =>
        subject.teachers?.some((teacher) => teacher.id === userRoleId),
      )
      ?.teachers?.find((teacher) => teacher.id === userRoleId)
      ?.teacherSubjectId ||
    (subjects &&
      subjects[0] &&
      subjects[0].teachers &&
      subjects[0].teachers[0] &&
      subjects[0].teachers[0].teacherSubjectId) ||
    -1;

  if (!subjects) return <div>loading...</div>;

  if (!searchParams.has("teacherSubject")) {
    router.push(
      `${path}?${addQueryInParamsString(searchParams, { name: "teacherSubject", value: teacherSubject })}`,
    );
  }

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
      <Select
        variant="dark"
        // @ts-ignore
        defaultValue={
          currentSubject
            ? {
                label:
                  currentSubject.subject.name +
                  " (" +
                  getFioByUser(currentSubject.teacher) +
                  ")",
                value: currentSubject.teacher.teacherSubjectId.toString(),
              }
            : undefined
        }
        onChange={({ value }) => {
          dispatch(actionSetTeacherSubjectIdLoading(true));
          router.push(
            path +
              `?${addQueryInParamsString(searchParams, { name: "teacherSubject", value })}`,
          );
        }}
        options={options}
      />
    </div>
  );
};

export default SubjectSelector;
