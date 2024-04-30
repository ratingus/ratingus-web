"use client";
import React, { ReactNode } from "react";

import { School } from "@/entity/School/model";
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
  const selectedSchool = useAppSelector(selectSelectedSchool);

  const handleSelectSchool = () => {
    dispatch(actionSetSelectedSchool(school));
  };
  return (
    <Button
      {...buttonProps}
      isActive={school.id === selectedSchool?.id}
      onClick={handleSelectSchool}
    >
      {children}
    </Button>
  );
};

export default ChooseSchool;
