import { configureStore } from "@reduxjs/toolkit";

import { modalSlice } from "@/shared/components/Modal/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [modalSlice.name]: modalSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({});
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
