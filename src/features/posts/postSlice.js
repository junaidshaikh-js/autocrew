import { createSlice } from "@reduxjs/toolkit";

import { getAllPosts } from "../../firebase/firebase-calls";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostLike: (state, action) => {
      state.posts = state.posts.map((_post) => {
        if (_post.id === action.payload.id) {
          return {
            ..._post,
            data: {
              ..._post.data,
              likes: _post.data.likes + action.payload.count,
            },
          };
        }

        return _post;
      });
    },

    updatePostsForDelete: (state, action) => {
      state.posts = state.posts.filter((_post) => _post.id !== action.payload);
    },

    updatePostData: (state, action) => {
      state.posts = state.posts.map((_post) => {
        if (_post.id === action.payload.id) {
          return {
            ..._post,
            data: {
              ..._post.data,
              postText: action.payload.postText,
              postImageUrl: action.payload.postImage.url,
              postImageName: action.payload.postImage.postImageName,
            },
          };
        }

        return _post;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { updatePostLike, updatePostsForDelete, updatePostData } =
  postSlice.actions;

export default postSlice.reducer;
