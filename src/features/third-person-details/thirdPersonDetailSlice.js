import { createSlice } from "@reduxjs/toolkit";

import { statusConstants } from "utils/constants";
import { getOtherUserData } from "../../firebase/firebase-calls";

const { idle, loading, fulfilled } = statusConstants;

const initialState = {
  thirdPersonDetails: {
    userData: {},
    following: [],
    followers: [],
    posts: [],
  },
  thirdPersonDetailLoading: idle,
};

const thirdPersonDetailSlice = createSlice({
  name: "thirdPersonDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOtherUserData.pending, (state) => {
      state.thirdPersonDetailLoading = loading;
    });

    builder.addCase(getOtherUserData.fulfilled, (state, action) => {
      state.thirdPersonDetailLoading = fulfilled;
      state.thirdPersonDetails = action.payload;
    });
  },
});

export default thirdPersonDetailSlice.reducer;
