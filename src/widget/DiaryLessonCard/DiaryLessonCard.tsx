import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Lesson } from "@/entity/Lesson/model";
import LessonCard from "@/entity/Lesson/ui/LessonCard";
import Button from "@/shared/components/Button/Button";

type DiaryLessonCardProps = Lesson & { bottomSlot?: ReactNode };

const DiaryLessonCard = (lesson: DiaryLessonCardProps) => {
  const { timetableNumber } = lesson;
  // TODO: перенести в /feature и сделать нормальное получение времени
  const router = useRouter();
  const handleLessonClick = () => {
    router.push(
      "/diary?week=" + 35 + "&day=" + 1 + "&lesson=" + timetableNumber,
    );
  };
  return (
    <Button onClick={handleLessonClick}>
      <LessonCard {...lesson} />
    </Button>
  );
};

export default DiaryLessonCard;
