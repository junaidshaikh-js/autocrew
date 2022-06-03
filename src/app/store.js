import { configureStore } from "@reduxjs/toolkit";

import authReducer from "features/authentication/authSlice";
import userReducer from "features/user-data/userSlice";
import postReducer from "features/posts/postSlice";
import usersReducer from "features/users/usersSlice";
import thirdPersonDetailReducer from "features/third-person-details/thirdPersonDetailSlice";

export const store = configureStore({
  reducer: {
    authDetail: authReducer,
    userDetail: userReducer,
    posts: postReducer,
    users: usersReducer,
    thirdPersonDetail: thirdPersonDetailReducer,
  },
});
