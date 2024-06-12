import React, { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Lesson } from "@/entity/Lesson/model";
import { LessonCard } from "@/entity/Lesson/ui/LessonCard";
import Button from "@/shared/components/Button/Button";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";

type DiaryLessonCardProps = Lesson & { day: number; bottomSlot?: ReactNode };

const DiaryLessonCard = ({ day, ...lesson }: DiaryLessonCardProps) => {
  const { timetableNumber } = lesson;
  // TODO: перенести в /feature и сделать нормальное получение времени
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleLessonClick = () => {
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "lesson", value: timetableNumber }, { name: "day", value: day })}`,
    );
  };
  return (
    <Button onClick={handleLessonClick}>
      <LessonCard {...lesson} />
    </Button>
  );
};

export default DiaryLessonCard;
