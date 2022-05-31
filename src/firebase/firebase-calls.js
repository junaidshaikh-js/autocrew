import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  writeBatch,
  doc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
  getDocs,
  query,
  orderBy,
  arrayRemove,
} from "firebase/firestore";

import { updateUserDetailState } from "features/user-data/userSlice";
import { db } from "./config";

export const createUserDb = async (
  firstName,
  lastName,
  userName,
  email,
  userId
) => {
  try {
    const batch = writeBatch(db);

    const userDataRef = doc(db, userId, "userData");
    const userPostsRef = doc(db, userId, "posts");
    const userFollowersRef = doc(db, userId, "followers");
    const userFollowingRef = doc(db, userId, "following");
    const usersRef = doc(db, "users", userId);

    const userData = {
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      userName,
      email,
      bio: "",
      profilePicture: "",
      website: "",
    };

    batch.set(userDataRef, userData);
    batch.set(usersRef, userData);
    batch.set(userPostsRef, { posts: [] });
    batch.set(userFollowersRef, { followers: [] });
    batch.set(userFollowingRef, { following: [] });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = createAsyncThunk(
  "userDetail/getUserDetail",
  async (userId) => {
    try {
      const userData = {};

      const querySnapshot = await getDocs(collection(db, userId));

      querySnapshot.forEach((doc) => {
        userData[doc.id] = doc.data();
      });

      return userData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetail = async (userId, updatedUserDetail, dispatch) => {
  try {
    const userDataRef = doc(db, userId, "userData");
    const usersRef = doc(db, "users", userId);

    await updateDoc(userDataRef, {
      ...updatedUserDetail,
      fullName: updatedUserDetail.firstName + " " + updatedUserDetail.lastName,
    });
    await updateDoc(usersRef, {
      ...updatedUserDetail,
      fullName: updatedUserDetail.firstName + " " + updatedUserDetail.lastName,
    });

    dispatch(
      updateUserDetailState({
        ...updatedUserDetail,
        fullName:
          updatedUserDetail.firstName + " " + updatedUserDetail.lastName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const addNewPost = async (userId, postText, postImage, dispatch) => {
  try {
    const userPostsRef = doc(db, userId, "posts");

    const docRef = await addDoc(collection(db, "posts"), {
      postBy: userId,
      postText: postText,
      postImageUrl: postImage.url,
      postImageName: postImage.fileName || "",
      dateCreated: Date.now(),
      likes: 0,
      comments: [],
    });

    await updateDoc(userPostsRef, { posts: arrayUnion(docRef.id) });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts/", async () => {
  const posts = [];

  const postsRef = collection(db, "posts");

  const q = query(postsRef, orderBy("dateCreated", "desc"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
});

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const users = [];

  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, data: doc.data() });
  });

  return users;
});

export const followUser = async (followedUserId, userId) => {
  try {
    const followingRef = doc(db, userId, "following");
    await updateDoc(followingRef, { following: arrayUnion(followedUserId) });

    const followedUserFollowingRef = doc(db, followedUserId, "followers");
    await updateDoc(followedUserFollowingRef, {
      followers: arrayUnion(userId),
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (unfollowedUserId, userId) => {
  try {
    const followingRef = doc(db, userId, "following");
    await updateDoc(followingRef, { following: arrayRemove(unfollowedUserId) });

    const followedUserFollowingRef = doc(db, unfollowedUserId, "followers");
    await updateDoc(followedUserFollowingRef, {
      followers: arrayRemove(userId),
    });
  } catch (error) {
    console.log(error);
  }
};
