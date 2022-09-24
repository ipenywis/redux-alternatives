import { configureStore } from "@reduxjs/toolkit";
import { photosSlice } from "./reduxToolkit";

export const reduxStore = configureStore({
  reducer: {
    photos: photosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
