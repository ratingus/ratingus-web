import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface SchoolState {
  selectedSchool: number | null;
}

const initialState = {
  selectedSchool: null,
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
