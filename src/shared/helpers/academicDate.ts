import { getDayJs } from "@/shared/helpers/date";

export function getAcademicDateByWeek(weekOfYear: number): Date {
  const date = getAcademicDate(new Date());
  const difference = (weekOfYear - 1) * 7;
  const calendar = new Date(date.getTime());
  calendar.setUTCHours(0, 0, 0, 0);
  calendar.setDate(calendar.getDate() + difference);
  return getDayJs()(calendar)
    .startOf("week")
    .add(getDayJs()(calendar).utcOffset(), "minutes")
    .toDate();
}

export function getAcademicWeekOfYear(date: Date): number {
  const calendar = new Date(date.getTime());
  calendar.setUTCHours(3, 0, 0, 0);
  const startOfYearWeek = getWeekOfYear(calendar);

  const academicStartDate = getAcademicDate(date);
  const academicCalendar = new Date(academicStartDate.getTime());
  academicCalendar.setUTCHours(3, 0, 0, 0);
  const academicStartWeek = getWeekOfYear(academicCalendar);

  console.log("startOfYearWeek");
  console.log(startOfYearWeek);
  console.log(academicStartWeek);

  let weekOfYear = startOfYearWeek - academicStartWeek;
  console.log(weekOfYear);
  if (academicStartWeek > startOfYearWeek) {
    weekOfYear = 52 - academicStartWeek + startOfYearWeek;
    console.log(weekOfYear);
  }
  return weekOfYear;
}

export function getAcademicDate(date: Date): Date {
  const calendar = new Date(date.toDateString());
  console.log("getAcademicDate");
  console.log(date);
  calendar.setUTCHours(3, 0, 0, 0);
  calendar.setUTCMonth(8, 1); // September is month 8 (0-based index)
  console.log(calendar);

  if (calendar.getTime() > date.getTime()) {
    calendar.setFullYear(calendar.getFullYear() - 1);
  }
  console.log(calendar);

  return calendar;
}

export function getWeekOfYear(date: Date): number {
  const target = new Date(date.valueOf());
  console.log("getWeekOfYear");
  console.log(target);
  const dayNr = (date.getUTCDay() + 6) % 7; // Make Sunday (0) the last day
  console.log(dayNr);
  target.setDate(target.getDate() - dayNr + 3); // Move date to nearest Thursday
  console.log(target);
  const jan4 = new Date(target.getFullYear(), 0, 4);
  console.log(jan4);
  const dayDiff = (target.getTime() - jan4.getTime()) / 86400000;
  console.log(dayDiff);
  console.log(Math.ceil((dayDiff + jan4.getUTCDay() + 1) / 7));
  return Math.ceil((dayDiff + jan4.getUTCDay() + 1) / 7);
}
