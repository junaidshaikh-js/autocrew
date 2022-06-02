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

    updatePostComment: (state, action) => {
      state.posts = state.posts.map((_post) => {
        if (_post.id === action.payload.id) {
          return {
            ..._post,
            data: {
              ..._post.data,
              comments: [..._post.data.comments, action.payload.comment],
            },
          };
        }

        return _post;
      });
    },

    deletePostComment: (state, action) => {
      state.posts = state.posts.map((_post) => {
        if (_post.id === action.payload.id) {
          return {
            ..._post,
            data: {
              ..._post.data,
              comments: _post.data.comments.filter(
                (_comment) => _comment.commentId !== action.payload.commentId
              ),
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

export const {
  updatePostLike,
  updatePostsForDelete,
  updatePostData,
  updatePostComment,
  deletePostComment,
} = postSlice.actions;

export default postSlice.reducer;
