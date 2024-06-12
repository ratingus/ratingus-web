"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

import { School } from "@/entity/School/model";
import { useChooseSchoolMutation } from "@/entity/School/query";
import {
  actionSetSelectedSchool,
  selectSelectedSchool,
} from "@/entity/School/store";
import Button, { ButtonProps } from "@/shared/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";

type ChooseSchoolProps = {
  buttonProps?: ButtonProps;
  children: ReactNode;
  school: School;
};

const ChooseSchool = ({ buttonProps, children, school }: ChooseSchoolProps) => {
  const dispatch = useAppDispatch();
  const [chooseSchool] = useChooseSchoolMutation();
  const selectedSchool = useAppSelector(selectSelectedSchool);
  const { update } = useSession();

  const handleSelectSchool = async () => {
    await chooseSchool({ id: school.id });
    await update({ school: school.id.toString() });
    dispatch(actionSetSelectedSchool(school.id));
  };
  return (
    <Button
      {...buttonProps}
      isActive={school.id === selectedSchool}
      onClick={handleSelectSchool}
    >
      {children}
    </Button>
  );
};

export default ChooseSchool;
