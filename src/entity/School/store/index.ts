import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface SchoolState {
  selectedSchool: {
    id: number;
    name: string;
  } | null;
}

const initialState = {
  selectedSchool: {
    id: 0,
    name: "Школа №31415",
  },
} satisfies SchoolState as SchoolState;

export const schoolSlice = createSlice({
  name: "school",
  initialState,

  selectors: {
    selectState: (state) => state,
  },

  reducers: {
    actionSetSelectedSchool(
      state,
      action: PayloadAction<SchoolState["selectedSchool"]>,
    ) {
      state.selectedSchool = action.payload;
    },
  },
});

export const { actionSetSelectedSchool } = schoolSlice.actions;

export const { selectState } = schoolSlice.selectors;

export default schoolSlice.reducer;

export const selectSelectedSchool = createDraftSafeSelector(
  [selectState],
  (state) => state.selectedSchool,
);
