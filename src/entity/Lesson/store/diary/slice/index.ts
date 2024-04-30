import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DayLesson } from "@/entity/Lesson/model";

interface DiaryState {
  dayLessons: { [key: number]: DayLesson[] };
}

const initialState = {
  dayLessons: [],
} satisfies DiaryState as DiaryState;

export const diarySlice = createSlice({
  name: "diary",
  initialState,

  selectors: {
    selectState: (state) => state,
  },

  reducers: {
    actionSetDayLessons(
      state,
      action: PayloadAction<{ week: number; dayLessons: DayLesson[] }>,
    ) {
      state.dayLessons = {
        ...state.dayLessons,
        [action.payload.week]: action.payload.dayLessons,
      };
    },
  },
});

export const { actionSetDayLessons } = diarySlice.actions;

export const { selectState } = diarySlice.selectors;

export default diarySlice.reducer;
