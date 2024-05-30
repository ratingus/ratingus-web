export function getAcademicDateByWeek(weekOfYear: number): Date {
  const date = getAcademicDate(new Date());
  const difference = (weekOfYear - 1) * 7;
  const calendar = new Date(date.getTime());
  calendar.setUTCHours(0, 0, 0, 0);
  calendar.setDate(calendar.getDate() + difference);
  return calendar;
}

export function getAcademicWeekOfYear(date: Date): number {
  const calendar = new Date(date.getTime());
  calendar.setUTCHours(3, 0, 0, 0);
  const startOfYearWeek = getWeekOfYear(calendar);

  const academicStartDate = getAcademicDate(date);
  const academicCalendar = new Date(academicStartDate.getTime());
  academicCalendar.setUTCHours(3, 0, 0, 0);
  const academicStartWeek = getWeekOfYear(academicCalendar);

  let weekOfYear = startOfYearWeek - academicStartWeek;
  if (academicStartWeek > startOfYearWeek) {
    weekOfYear = 52 - academicStartWeek + startOfYearWeek;
  }
  return weekOfYear;
}

export function getAcademicDate(date: Date): Date {
  const calendar = new Date(date.toDateString());
  calendar.setUTCHours(3, 0, 0, 0);
  calendar.setMonth(8); // September is month 8 (0-based index)
  calendar.setDate(1);

  if (calendar.getTime() > date.getTime()) {
    calendar.setFullYear(calendar.getFullYear() - 1);
  }

  return calendar;
}

export function getWeekOfYear(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getUTCDay() + 6) % 7; // Make Sunday (0) the last day
  target.setDate(target.getDate() - dayNr + 3); // Move date to nearest Thursday
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target.getTime() - jan4.getTime()) / 86400000;
  return Math.ceil((dayDiff + jan4.getUTCDay() + 1) / 7);
}
