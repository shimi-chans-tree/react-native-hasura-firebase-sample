import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../types/types";
import { RootState } from "../app/store";

const authinInitialState: Auth = {
  isLoanching: true,
  isLoading: false,
  error: "",
  token: "",
};

export const authSlice = createSlice({
  name: "login",
  initialState: authinInitialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoanching = false;
      state.isLoading = false;
      state.error = null;
      state.token = payload;
    },
    loginFailure: (state, { payload }) => {
      state.isLoanching = false;
      state.isLoading = false;
      state.error = payload;
      state.token = null;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  authSlice.actions;

export const getToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
