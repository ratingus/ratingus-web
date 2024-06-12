import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StudentsTableMarkProps } from "@/widget/StudentsTable/StudentsTableMark";

interface JournalState {
  selectedTeacherId: number | null;
  selectedStudentLesson: StudentsTableMarkProps | null;
}

const initialState = {
  selectedTeacherId: null,
  selectedStudentLesson: null,
} satisfies JournalState as JournalState;

export const journalSlice = createSlice({
  name: "journal",
  initialState,

  selectors: {
    selectState: (state) => state,
  },

  reducers: {
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

export const { actionSetSelectedTeacherId, actionSetSelectedStudentTeacher } =
  journalSlice.actions;

export const { selectState } = journalSlice.selectors;

export default journalSlice.reducer;
