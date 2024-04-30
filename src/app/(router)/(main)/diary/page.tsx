"use client";
import { SwiperSlide } from "swiper/react";

import styles from "./page.module.scss";

import { DayLesson } from "@/entity/Lesson/model";
import DayLessonCard from "@/entity/Lesson/ui/DayLessonCard";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";

export default function Diary() {
  const lessonsByWeek: DayLesson[] = Array(6)
    .fill([])
    .map((_, i) => ({
      dateTime: new Date(Date.UTC(2024, 3, 29 + i)),
      studies: [
        {
          id: 1 + 3 * i,
          studyId: 0,
          subject: "Математика",
          teacher: {
            id: 1,
            name: "Иван",
            surname: "Иванов",
            patronymic: "Иванович",
          },
          timetableNumber: 1,
          mark: "5",
          attendance: "was",
        },
        {
          id: 2 + 3 * i,
          studyId: 1,
          subject: "Физика",
          teacher: {
            id: 2,
            name: "Петр",
            surname: "Петров",
            patronymic: "Петрович",
          },
          timetableNumber: 2,
          mark: "4",
          attendance: "was",
        },
        {
          id: 3 + 3 * i,
          studyId: 2,
          subject: "Химия",
          teacher: {
            id: 3,
            name: "Сидор",
            surname: "Сидоров",
            patronymic: "Сидорович",
          },
          timetableNumber: 3,
          mark: "3",
          attendance: "was",
        },
      ],
    }));

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
          <DayLessonCard
            key={dayLesson.dateTime.toISOString()}
            {...dayLesson}
          />
        ))}
      </div>
    </>
  );
}
