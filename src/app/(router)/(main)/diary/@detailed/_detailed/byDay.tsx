"use client";
import React, { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SwiperRef, SwiperSlide } from "swiper/react";

import styles from "./ByDay.module.scss";

import { useGetLessonsByWeekQuery } from "@/entity/Lesson/query";
import LessonCardDetailed from "@/entity/Lesson/ui/LessonCardDetailed";
import Button from "@/shared/components/Button/Button";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getAcademicDateByWeek } from "@/shared/helpers/academicDate";
import { getDateString, getDayAndMonth } from "@/shared/helpers/date";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { capitalize } from "@/shared/helpers/strings";

export type DetailedPageProps = {
  week: number;
  day: number;
};

const ByDay = ({ week, day }: DetailedPageProps) => {
  const { data } = useGetLessonsByWeekQuery({
    week,
  });

  // TODO: перенести в /feature

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleBack = () => {
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "day", value: undefined })}`,
    );
  };
  const swiperRef = useRef<SwiperRef>(null);
  const index = data?.findIndex(({ dayOfWeek }) => dayOfWeek === day);

  useEffect(() => {
    if (swiperRef.current && data && index) {
      swiperRef.current.swiper.slideTo(index);
    }
  }, [data, day, index]);

  if (!data) return <div>loading...</div>;

  const dayData = data?.find(({ dayOfWeek }) => dayOfWeek === day);

  if (!dayData || index === undefined || index < 0)
    return <div>Нет такого дня</div>;

  const date = getAcademicDateByWeek(week);
  const weekDays = data.map(({ dayOfWeek }) => {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + dayOfWeek - 1);
    return newDate;
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper}>
        <Slider
          ref={swiperRef}
          className={styles.slider}
          swiperProps={{
            initialSlide: index,
            onSlideChange: (swiper) => {
              const currentSlide = swiper.activeIndex;
              const currentSlideDate =
                // @ts-ignore
                swiper.slides[currentSlide].attributes.getNamedItem(
                  "data-day",
                ).value;
              router.push(
                path +
                  `?${addQueryInParamsString(searchParams, { name: "day", value: Number(currentSlideDate) })}`,
              );
            },
          }}
        >
          {weekDays.map((day) => (
            <SwiperSlide key={day.getDay()} data-day={day.getDay()}>
              <div className={styles.sliderHeader}>
                <Typography variant="h4">
                  {capitalize(getDateString(day.toString(), "dddd"))}
                </Typography>
                <Typography variant="h4">
                  {getDayAndMonth(day.toString())}
                </Typography>
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
          {dayData.studies.map((lesson) => (
            <LessonCardDetailed
              key={lesson.timetableNumber}
              day={day}
              {...lesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ByDay;
