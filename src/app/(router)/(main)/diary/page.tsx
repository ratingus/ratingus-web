"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SwiperSlide } from "swiper/react";

import styles from "./page.module.scss";

import { useGetLessonsByWeekQuery } from "@/entity/Lesson/query";
import DayLessonCard from "@/entity/Lesson/ui/DayLessonCard";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import {
  getAcademicDateByWeek,
  getAcademicWeekOfYear,
} from "@/shared/helpers/academicDate";
import { getWeekDateBetween } from "@/shared/helpers/date";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";

const getThreeDatesFromWeek = (week: number) => {
  const prevWeek = getAcademicDateByWeek(week - 1);
  const currWeek = getAcademicDateByWeek(week);
  const nextWeek = getAcademicDateByWeek(week + 1);
  return [prevWeek, currWeek, nextWeek];
};

export default function Diary() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const weekInParams = searchParams.get("week");
  const hasWeekInParams = Boolean(
    searchParams.has("week") && Number(weekInParams),
  );
  const nowWeek = getAcademicWeekOfYear(new Date());
  const [week, setWeek] = useState(
    hasWeekInParams ? Number(weekInParams) : nowWeek,
  );

  useEffect(() => {
    setWeek(hasWeekInParams ? Number(weekInParams) : nowWeek);
  }, [hasWeekInParams, nowWeek, weekInParams]);

  const { data: lessonsByWeek } = useGetLessonsByWeekQuery({
    week,
  });

  if (!lessonsByWeek) return <div>loading...</div>;

  return (
    <>
      <Slider
        className={styles.slider}
        swiperProps={{
          onSlideChange: (swiper) => {
            const currentSlide = swiper.activeIndex;
            const currentSlideDate =
              // @ts-ignore
              swiper.slides[currentSlide].attributes.getNamedItem(
                "data-week",
              ).value;
            setWeek(Number(currentSlideDate) + 1);
            swiper.activeIndex = 1;
            router.push(
              path +
                `?${addQueryInParamsString(searchParams, { name: "week", value: Number(currentSlideDate) + 1 })}`,
            );
          },
        }}
      >
        {getThreeDatesFromWeek(week).map((date) => (
          <SwiperSlide
            key={date.toDateString()}
            data-week={getAcademicWeekOfYear(date)}
          >
            <Typography color="textPrimary">
              {getWeekDateBetween(date)}
            </Typography>
          </SwiperSlide>
        ))}
      </Slider>
      <div className={styles.lessons}>
        {lessonsByWeek.map((dayLesson) => (
          <DayLessonCard key={dayLesson.dateTime} {...dayLesson} />
        ))}
      </div>
    </>
  );
}
