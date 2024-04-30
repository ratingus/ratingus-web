import React from "react";
import { useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";

import styles from "@/app/(router)/(main)/diary/@detailed/_detailed/ByDay.module.scss";
import { generateDayLessonDetailed } from "@/entity/Lesson/mock";
import LessonBlockDetailed from "@/entity/Lesson/ui/LessonBlockDetailed";
import Button from "@/shared/components/Button/Button";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDateString, getDayAndMonth } from "@/shared/helpers/date";
import { capitalize } from "@/shared/helpers/strings";

// import styles from './ByLesson.module.scss';

export type DetailedPageProps = {
  week: number;
  day: number;
  lesson: number;
};
const ByLesson = ({ week, day, lesson }: DetailedPageProps) => {
  const data = generateDayLessonDetailed(day);
  const study = data.studies[lesson - 1];

  const router = useRouter();
  const handleBack = () => {
    router.push("/diary?week=" + week + "&day=" + day);
  };

  return (
    <div>
      <div className={styles.sliderHeader}>
        <Typography variant="h4">
          {capitalize(getDateString(data.dateTime, "dddd"))}
        </Typography>
        <Typography variant="h4">{getDayAndMonth(data.dateTime)}</Typography>
      </div>
      <div className={styles.sliderWrapper}>
        <Slider className={styles.slider}>
          {data.studies.map((study) => (
            <SwiperSlide key={study.timetableNumber}>
              <div>
                <div className={styles.sliderContent}>
                  <Typography variant="small">
                    №{study.timetableNumber}
                  </Typography>
                  <Typography variant="small">8:00 - 8:40</Typography>
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
        <LessonBlockDetailed key={study.timetableNumber} {...study} />
      </div>
    </div>
  );
};

export default ByLesson;
