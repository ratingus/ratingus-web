"use client";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  actionSetSelectedAnnouncementMode,
  optionsArray,
  OptionType,
  selectAnnouncementMode,
} from "@/entity/Announcement/store";
import { TabOption, Tabs } from "@/shared/components/Tabs/Tabs";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
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
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

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
      return false;
    }
    if (role === "unauthenticated" || role === "loading") {
      return false;
    }
    return true;
  });

  const handleChange = useCallback(
    (value: TabOption<OptionType>) => {
      dispatch(actionSetSelectedAnnouncementMode(value));
      if (value.value === "class") {
        setClassId(classId);
      } else {
        setClassId(undefined);
      }
      router.push(
        path +
          `?${addQueryInParamsString(searchParams, { name: "type", value: value.value })}`,
      );
    },
    [classId, dispatch, path, router, searchParams, setClassId, type],
  );

  useEffect(() => {
    const selectedOptionType = type || "all";
    const selectedOption = optionsArray.find(
      (option) => option.value === selectedOptionType,
    );
    if (selectedOption) {
      handleChange(selectedOption);
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (selectedOption === null) return <div>loading...</div>;

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
