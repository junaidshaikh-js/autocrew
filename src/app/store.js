import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/authentication/authSlice";
import userReducer from "features/user-data/userSlice";

export const store = configureStore({
  reducer: {
    authDetail: authReducer,
    userDetail: userReducer,
  },
});
