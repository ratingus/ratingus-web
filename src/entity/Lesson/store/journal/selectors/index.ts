import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { selectState } from "../slice";

export const selectSelectedTeacherId = createDraftSafeSelector(
  [selectState],
  (state) => state.selectedTeacherId,
);

export const selectSelectedStudentTeacher = createDraftSafeSelector(
  [selectState],
  (state) => state.selectedStudentLesson,
);

export const selectClassLoading = createDraftSafeSelector(
  [selectState],
  (state) => state.classLoading,
);

export const selectTeacherSubjectIdLoading = createDraftSafeSelector(
  [selectState],
  (state) => state.teacherSubjectIdLoading,
);
