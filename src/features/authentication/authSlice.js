import { createSlice } from "@reduxjs/toolkit";

import { login, signup, loginAsGuest } from "../../firebase/firebase-auth";
import { statusConstants } from "utils/constants";

const { idle, loading, fulfilled, rejected } = statusConstants;

const initialState = {
  token: localStorage.getItem("token"),
  isLoggingIn: idle,
  isSigningUp: idle,
  isLoggingInAsGuest: idle,
};

const authSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoggingIn = loading;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggingIn = fulfilled;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoggingIn = rejected;
    });

    builder.addCase(signup.pending, (state) => {
      state.isSigningUp = loading;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isSigningUp = fulfilled;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(signup.rejected, (state) => {
      state.isSigningUp = rejected;
    });

    builder.addCase(loginAsGuest.pending, (state) => {
      state.isLoggingInAsGuest = loading;
    });
    builder.addCase(loginAsGuest.fulfilled, (state, action) => {
      state.isLoggingInAsGuest = fulfilled;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(loginAsGuest.rejected, (state) => {
      state.isLoggingInAsGuest = rejected;
    });
  },
});

export const { signupUser, loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
