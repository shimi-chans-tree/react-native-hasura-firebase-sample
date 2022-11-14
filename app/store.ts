import { configureStore, combineReducers } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: combineReducers({
    ui: uiReducer,
    auth: authReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
