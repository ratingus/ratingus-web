import { configureStore } from "@reduxjs/toolkit";

import { announcementsApi } from "@/entity/Announcement/query";
import { announcementSlice } from "@/entity/Announcement/store";
import { schoolSlice } from "@/entity/School/store";
import { modalSlice } from "@/shared/components/Modal/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [modalSlice.name]: modalSlice.reducer,
      [announcementSlice.name]: announcementSlice.reducer,
      [schoolSlice.name]: schoolSlice.reducer,
      [announcementsApi.reducerPath]: announcementsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({}).concat(announcementsApi.middleware);
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
