"use client";
import React, { Dispatch, SetStateAction } from "react";

import {
  actionSetSelectedAnnouncementMode,
  optionsArray,
  OptionType,
  selectAnnouncementMode,
} from "@/entity/Announcement/store";
import { useUser } from "@/entity/User/hooks";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtk";

type AnnouncementSwitchProps = {
  isLoading?: boolean;
  onClassChange?: () => void;
  setClassId: Dispatch<SetStateAction<number | undefined>>;
};

// TODO: Проверка роли для выдачи options
const AnnouncementSwitch = ({
  isLoading,
  setClassId,
}: AnnouncementSwitchProps) => {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector(selectAnnouncementMode);
  const { classId: userClassId } = useUser();

  const handleChange = (value: TabOption<OptionType>) => {
    dispatch(actionSetSelectedAnnouncementMode(value));
    if (value.value === "class") {
      setClassId(userClassId);
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
      options={optionsArray}
    />
  );
};

export default AnnouncementSwitch;
