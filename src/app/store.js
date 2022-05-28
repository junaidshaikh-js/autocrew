import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/authentication/authSlice";

export const store = configureStore({
  reducer: {
    authDetail: userReducer,
  },
});
