import React, { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SwiperRef, SwiperSlide } from "swiper/react";

import styles from "@/app/(router)/(main)/diary/@detailed/_detailed/ByDay.module.scss";
import { getTime } from "@/entity/Announcement/helpers";
import { useGetLessonsByWeekQuery } from "@/entity/Lesson/query";
import LessonBlockDetailed from "@/entity/Lesson/ui/LessonBlockDetailed";
import Button from "@/shared/components/Button/Button";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getAcademicDateByWeek } from "@/shared/helpers/academicDate";
import { getDateString, getDayAndMonth, getDayJs } from "@/shared/helpers/date";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { capitalize } from "@/shared/helpers/strings";

// import styles from './ByLesson.module.scss';

export type DetailedPageProps = {
  week: number;
  day: number;
  lesson: number;
};
const ByLesson = ({ week, day, lesson }: DetailedPageProps) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleBack = () => {
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "lesson", value: undefined })}`,
    );
  };
  const swiperRef = useRef<SwiperRef>(null);

  const { data } = useGetLessonsByWeekQuery({
    week,
  });
  const dayData = data?.find(({ dayOfWeek }) => dayOfWeek === day);
  const studies = dayData?.studies;
  const study = studies?.find(
    ({ timetableNumber }) => timetableNumber === lesson,
  );

  useEffect(() => {
    if (swiperRef.current && studies) {
      swiperRef.current.swiper.slideTo(
        studies.findIndex(({ timetableNumber }) => timetableNumber === lesson),
      );
    }
  }, [day, lesson, studies]);

  if (data === undefined) {
    return <div>loading...</div>;
  }

  if (!dayData) return <div>Нет такого дня</div>;

  if (!studies || !study) return <div>Нет такого урока</div>;

  const date = getDayJs()(getAcademicDateByWeek(week))
    .add(day - 1, "days")
    .toDate();

  return (
    <div>
      <div className={styles.sliderHeader}>
        <Typography variant="h4">
          {capitalize(getDateString(dayData.dateTime, "dddd"))}
        </Typography>
        <Typography variant="h4">{getDayAndMonth(dayData.dateTime)}</Typography>
      </div>
      <div className={styles.sliderWrapper}>
        <Slider
          ref={swiperRef}
          className={styles.slider}
          swiperProps={{
            onSlideChange: (swiper) => {
              const lesson = studies[swiper.activeIndex].timetableNumber;
              router.push(
                path +
                  `?${addQueryInParamsString(searchParams, { name: "lesson", value: lesson })}`,
              );
            },
          }}
        >
          {dayData.studies.map(({ timetableNumber, startTime, endTime }) => (
            <SwiperSlide key={timetableNumber}>
              <div>
                <div className={styles.sliderContent}>
                  <Typography variant="small">№{timetableNumber}</Typography>
                  <Typography variant="small">
                    <time>
                      {getTime(startTime)} - {getTime(endTime)}
                    </time>
                  </Typography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
      <Button variant="ghost" onClick={handleBack}>
        <Typography color="textHelper">&lt; Назад</Typography>
      </Button>
      <div className={styles.lesson}>
        <LessonBlockDetailed
          key={study.timetableNumber}
          date={date}
          {...study}
        />
      </div>
    </div>
  );
};

export default ByLesson;
