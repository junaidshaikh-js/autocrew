import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "../../firebase/firebase-calls";
import { statusConstants } from "utils/constants";

const { idle, loading, fulfilled, rejected } = statusConstants;

const initialState = {
  userDetails: {},
  userDetailLoading: idle,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserDetailState: (state, action) => {
      state.userDetails.userData = {
        ...state.userDetails.userData,
        ...action.payload,
      };
    },

    updateUserFollowing: (state, action) => {
      state.userDetails.following = {
        following: [...state.userDetails.following.following, action.payload],
      };
    },

    updateUserUnfollow: (state, action) => {
      state.userDetails.following = {
        following: state.userDetails.following.following.filter(
          (_user) => _user !== action.payload
        ),
      };
    },

    updateLikedPosts: (state, action) => {
      state.userDetails.likedPost.likedPost = [
        ...state.userDetails.likedPost.likedPost,
        action.payload,
      ];
    },

    updateLikedPostsForDislike: (state, action) => {
      state.userDetails.likedPost.likedPost =
        state.userDetails.likedPost.likedPost.filter(
          (post) => post !== action.payload
        );
    },

    addToBookmark: (state, action) => {
      state.userDetails.bookmarks.bookmarks = [
        ...state.userDetails.bookmarks.bookmarks,
        action.payload,
      ];
    },

    removeFromBookmark: (state, action) => {
      state.userDetails.bookmarks.bookmarks =
        state.userDetails.bookmarks.bookmarks.filter(
          (post) => post !== action.payload
        );
    },

    addUserPost: (state, action) => {
      state.userDetails.posts.posts = [
        ...state.userDetails.posts.posts,
        action.payload,
      ];
    },

    deleteUserPost: (state, action) => {
      state.userDetails.posts.posts = state.userDetails.posts.posts.filter(
        (post) => post !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetail.pending, (state) => {
      state.userDetailLoading = loading;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetailLoading = fulfilled;
      state.userDetails = action.payload;
    });
    builder.addCase(getUserDetail.rejected, (state) => {
      state.userDetailLoading = rejected;
    });
  },
});

export const {
  updateUserDetailState,
  updateUserFollowing,
  updateUserUnfollow,
  updateLikedPosts,
  updateLikedPostsForDislike,
  addToBookmark,
  removeFromBookmark,
  addUserPost,
  deleteUserPost,
} = userSlice.actions;

export default userSlice.reducer;
