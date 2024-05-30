export const LESSONS_CONTEXT_PATH = "/diary";

export const LESSONS_PATH = `${LESSONS_CONTEXT_PATH}/week`;
export const LESSONS_BY_WEEK = (week: number) =>
  `${LESSONS_CONTEXT_PATH}?week=${week}`;
