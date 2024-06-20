import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StudentsTableMarkProps } from "@/widget/StudentsTable/StudentsTableMark";

interface JournalState {
  selectedTeacherId: number | null;
  selectedStudentLesson: StudentsTableMarkProps | null;
  teacherSubjectIdLoading: boolean;
  classLoading: boolean;
}

const initialState = {
  selectedTeacherId: null,
  selectedStudentLesson: null,
  teacherSubjectIdLoading: false,
  classLoading: false,
} satisfies JournalState as JournalState;

export const journalSlice = createSlice({
  name: "journal",
  initialState,

  selectors: {
    selectState: (state) => state,
  },

  reducers: {
    actionSetTeacherSubjectIdLoading(
      state,
      action: PayloadAction<JournalState["teacherSubjectIdLoading"]>,
    ) {
      state.teacherSubjectIdLoading = action.payload;
    },
    actionSetClassLoading(
      state,
      action: PayloadAction<JournalState["classLoading"]>,
    ) {
      state.classLoading = action.payload;
    },
    actionSetSelectedTeacherId(
      state,
      action: PayloadAction<JournalState["selectedTeacherId"]>,
    ) {
      state.selectedTeacherId = action.payload;
    },
    actionSetSelectedStudentTeacher(
      state,
      action: PayloadAction<JournalState["selectedStudentLesson"]>,
    ) {
      state.selectedStudentLesson = action.payload;
    },
  },
});

export const {
  actionSetSelectedTeacherId,
  actionSetTeacherSubjectIdLoading,
  actionSetClassLoading,
  actionSetSelectedStudentTeacher,
} = journalSlice.actions;

export const { selectState } = journalSlice.selectors;

export default journalSlice.reducer;
