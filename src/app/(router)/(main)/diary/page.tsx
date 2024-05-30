"use client";
import { SwiperSlide } from "swiper/react";

import styles from "./page.module.scss";

import { useGetLessonsByWeekQuery } from "@/entity/Lesson/query";
import DayLessonCard from "@/entity/Lesson/ui/DayLessonCard";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getAcademicWeekOfYear } from "@/shared/helpers/academicDate";

export default function Diary() {
  const week = getAcademicWeekOfYear(new Date());
  console.log(week);
  const { data: lessonsByWeek } = useGetLessonsByWeekQuery({ week: 39 });
  console.log(lessonsByWeek);

  if (!lessonsByWeek) return <div>loading...</div>;

  return (
    <>
      <Slider className={styles.slider}>
        <SwiperSlide>
          <Typography color="textPrimary">22 - 27 Апр</Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography color="textPrimary">29 Апр - 4 Мая</Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography color="textPrimary">6 - 11 Мая</Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography color="textPrimary">13 - 18 Мая</Typography>
        </SwiperSlide>
      </Slider>
      <div className={styles.lessons}>
        {lessonsByWeek.map((dayLesson) => (
          <DayLessonCard key={dayLesson.dateTime} {...dayLesson} />
        ))}
      </div>
    </>
  );
}
