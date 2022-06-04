import toast from "react-hot-toast";

import {
  bookmarkPost,
  dislikePost,
  likePost,
  removePostFromBookmark,
  deletePost,
} from "../../firebase/firebase-calls";

import {
  updateLikedPosts,
  updateLikedPostsForDislike,
  addToBookmark,
  removeFromBookmark,
  deleteUserPost,
} from "features/user-data/userSlice";

import { updatePostLike, updatePostsForDelete } from "features/posts/postSlice";

export const getPostTime = (dateCreated) => {
  let now = Date.now();
  let numberOfMillisecondsPassed = now - dateCreated;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;

  seconds = Math.floor(numberOfMillisecondsPassed / 1000);

  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
  } else {
    return `${seconds}S`;
  }

  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
  } else {
    return `${minutes}M`;
  }

  if (hours > 24) {
    days = Math.floor(hours / 24);
  } else {
    return `${hours}H`;
  }

  if (days) return `${days}D`;
};

export const handlePostLike = async (
  postAction,
  postId,
  dispatch,
  token,
  postBy
) => {
  try {
    if (postAction === "dec") {
      await dislikePost(postId, token);
      dispatch(updatePostLike({ id: postId, count: -1 }));
      dispatch(updateLikedPostsForDislike(postId));
    } else {
      await likePost(postId, token, postBy.id);
      dispatch(updatePostLike({ id: postId, count: 1 }));
      dispatch(updateLikedPosts(postId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleBookmark = async (postAction, postId, token, dispatch) => {
  try {
    if (postAction === "remove") {
      await removePostFromBookmark(postId, token);
      dispatch(removeFromBookmark(postId, token));
      toast.success("Post removed from bookmark");
    } else {
      await bookmarkPost(postId, token);
      dispatch(addToBookmark(postId, token));
      toast.success("Post bookmarked");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handlePostDelete = async (postId, token, dispatch) => {
  try {
    await deletePost(postId, token);
    dispatch(deleteUserPost(postId));
    dispatch(updatePostsForDelete(postId));
    toast.success("Post deleted");
  } catch (error) {
    console.log(error);
  }
};
