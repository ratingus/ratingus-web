import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JournalState {
  selectedTeacherId: number | null;
}

const initialState = {
  selectedTeacherId: null,
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
  },
});

export const { actionSetSelectedTeacherId } = journalSlice.actions;

export const { selectState } = journalSlice.selectors;

export default journalSlice.reducer;
