"use client";
import React, { Dispatch, SetStateAction } from "react";

import {
  actionSetSelectedAnnouncementMode,
  optionsArray,
  OptionType,
  selectAnnouncementMode,
} from "@/entity/Announcement/store";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";
import { useRole } from "@/shared/hooks/useRole";
import { useUser } from "@/shared/hooks/useUser";

type AnnouncementSwitchProps = {
  isLoading?: boolean;
  onClassChange?: () => void;
  setClassId: Dispatch<SetStateAction<number | undefined>>;
};

const AnnouncementSwitch = ({
  isLoading,
  setClassId,
}: AnnouncementSwitchProps) => {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector(selectAnnouncementMode);
  const { classId } = useUser();
  const role = useRole();
  const options = optionsArray.filter((option) => {
    if (role !== "STUDENT" && option.value === "class") {
      return false;
    }
    if (
      role !== "TEACHER" &&
      role !== "LOCAL_ADMIN" &&
      option.value === "add"
    ) {
      return true;
    }
    if (role === "unauthenticated" || role === "loading") {
      return false;
    }
    return true;
  });

  const handleChange = (value: TabOption<OptionType>) => {
    dispatch(actionSetSelectedAnnouncementMode(value));
    if (value.value === "class") {
      setClassId(classId);
    } else if (value.value === "all") {
      setClassId(undefined);
    }
  };

  return (
    <Tabs<OptionType>
      isDisable={isLoading}
      loadingValue={isLoading ? selectedOption.value : undefined}
      onChange={handleChange}
      sizeVariant="big"
      variant="secondary"
      defaultOption={selectedOption}
      options={options}
    />
  );
};

export default AnnouncementSwitch;
