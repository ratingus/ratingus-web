import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { selectState } from "../slice";

export const selectSelectedTeacherId = createDraftSafeSelector(
  [selectState],
  (state) => state.selectedTeacherId,
);
