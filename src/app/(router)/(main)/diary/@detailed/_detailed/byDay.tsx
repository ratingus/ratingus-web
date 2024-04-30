import React from "react";
import { useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";

import styles from "./ByDay.module.scss";

import { generateDayLessonDetailed } from "@/entity/Lesson/mock";
import LessonCardDetailed from "@/entity/Lesson/ui/LessonCardDetailed";
import Button from "@/shared/components/Button/Button";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDateString, getDayAndMonth } from "@/shared/helpers/date";
import { capitalize } from "@/shared/helpers/strings";

export type DetailedPageProps = {
  week: number;
  day: number;
};

const ByDay = ({ week, day }: DetailedPageProps) => {
  const weekDays = Array(6)
    .fill([])
    .map((_, i) => new Date(Date.UTC(2024, 3, 29 + i)));
  const data = generateDayLessonDetailed(day);

  // TODO: перенести в /feature

  const router = useRouter();
  const handleBack = () => {
    router.push("/diary?week=" + week);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper}>
        <Slider className={styles.slider}>
          {weekDays.map((day) => (
            <SwiperSlide key={day.getDay()}>
              <div className={styles.sliderHeader}>
                <Typography variant="h4">
                  {capitalize(getDateString(day, "dddd"))}
                </Typography>
                <Typography variant="h4">{getDayAndMonth(day)}</Typography>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
      <Button variant="ghost" onClick={handleBack}>
        <Typography color="textHelper">&lt; Назад</Typography>
      </Button>
      <div className={styles.lessonsWrapper}>
        <div className={styles.lessons}>
          {data.studies.map((lesson) => (
            <LessonCardDetailed key={lesson.timetableNumber} {...lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ByDay;
