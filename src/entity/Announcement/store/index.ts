import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { TabOption } from "@/shared/components/Tabs/Tabs";
import { ArrayType } from "@/shared/types";

export const options = {
  all: {
    label: "Все объявления",
    value: "all",
  },
  class: {
    label: "Класс",
    value: "class",
  },
  add: {
    label: "+",
    value: "add",
  },
};

export const typedOptions = options as unknown as {
  [key in OptionType]: TabOption<OptionType>;
};

export const optionsArray = Object.values(typedOptions);

export type OptionType = keyof ArrayType<typeof options>;
interface AnnouncementState {
  selectedAnnouncementMode: TabOption<OptionType> | null;
}

const initialState = {
  selectedAnnouncementMode: null,
} satisfies AnnouncementState as AnnouncementState;

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,

  selectors: {
    selectState: (state) => state,
  },

  reducers: {
    actionSetSelectedAnnouncementMode(
      state,
      action: PayloadAction<TabOption<OptionType>>,
    ) {
      state.selectedAnnouncementMode = action.payload;
    },
  },
});

export const { actionSetSelectedAnnouncementMode } = announcementSlice.actions;

export const { selectState } = announcementSlice.selectors;

export default announcementSlice.reducer;

export const selectAnnouncementMode = createDraftSafeSelector(
  [selectState],
  (state) => state.selectedAnnouncementMode,
);
