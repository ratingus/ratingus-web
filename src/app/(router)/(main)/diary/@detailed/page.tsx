"use client";
import { useSearchParams } from "next/navigation";

import DefaultDetailed from "./_detailed/default";
import styles from "./page.module.scss";

import ByDay from "@/app/(router)/(main)/diary/@detailed/_detailed/byDay";
import ByLesson from "@/app/(router)/(main)/diary/@detailed/_detailed/byLesson";

export default function DetailedPage() {
  const params = useSearchParams();
  const week = Number(params.get("week"));
  const day = Number(params.get("day"));
  const lesson = Number(params.get("lesson"));
  console.log("DetailedPage: week, day, lesson", week, day, lesson);

  if (!week || !(day || lesson)) {
    return <DefaultDetailed />;
  }
  const dateParams = { week, day, lesson };

  if (lesson) {
    return (
      <div className={styles.layout}>
        <ByLesson {...dateParams} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <ByDay {...dateParams} />
    </div>
  );
}
