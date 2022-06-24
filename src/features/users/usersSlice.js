import { createSlice } from "@reduxjs/toolkit";
import userSlice from "features/user-data/userSlice";

import { getAllUsers } from "../../firebase/firebase-calls";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserDetailState: (state, action) => {
      state.users = state.users.map((_user) => {
        if (_user.id === action.payload.token) {
          return {
            ..._user,
            data: {
              ..._user.data,
              ...action.payload.userDetails,
            },
          };
        }

        return _user;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { updateUserDetailState } = usersSlice.actions;
export default usersSlice.reducer;
