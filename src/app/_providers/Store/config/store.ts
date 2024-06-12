import { configureStore } from "@reduxjs/toolkit";

import { announcementsApi } from "@/entity/Announcement/query";
import { announcementSlice } from "@/entity/Announcement/store";
import { diarySlice } from "@/entity/Lesson/store/diary/slice";
import { journalSlice } from "@/entity/Lesson/store/journal/slice";
import { classApi } from "@/entity/School/query";
import { schoolSlice } from "@/entity/School/store";
import { profileApi } from "@/entity/User/query";
import { baseApi } from "@/shared/api/rtkq";
import { modalSlice } from "@/shared/components/Modal/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [modalSlice.name]: modalSlice.reducer,
      [announcementSlice.name]: announcementSlice.reducer,
      [schoolSlice.name]: schoolSlice.reducer,
      [diarySlice.name]: diarySlice.reducer,
      [journalSlice.name]: journalSlice.reducer,
      [announcementsApi.reducerPath]: announcementsApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [classApi.reducerPath]: classApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
