export const ANNOUNCEMENTS_CONTEXT_PATH = "/announcements";

export const ANNOUNCEMENTS_PATH = `${ANNOUNCEMENTS_CONTEXT_PATH}`;
export const ANNOUNCEMENTS_BY_CLASS_PATH = (classId: number) =>
  `${ANNOUNCEMENTS_CONTEXT_PATH}?class=${classId}`;
