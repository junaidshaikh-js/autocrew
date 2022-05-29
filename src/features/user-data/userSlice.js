import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "../../firebase/firebase-calls";
import { statusConstants } from "utils/constants";

const { idle, loading, fulfilled, rejected } = statusConstants;

const initialState = {
  userData: {
    firstName: "",
    lastName: "",
    fullName: "",
    userName: "",
    email: "",
    bio: "",
    website: "",
    profilePicture: "",
  },
  userDetailLoading: idle,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetail.pending, (state) => {
      state.userDetailLoading = loading;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetailLoading = fulfilled;
      state.userData = action.payload;
    });
    builder.addCase(getUserDetail.rejected, (state) => {
      state.userDetailLoading = rejected;
    });
  },
});

export default userSlice.reducer;
