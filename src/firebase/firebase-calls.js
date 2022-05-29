import { createAsyncThunk } from "@reduxjs/toolkit";
import { writeBatch, doc, getDoc, updateDoc } from "firebase/firestore";

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
    const usersRef = doc(db, "users", userId);

    batch.set(userDataRef, {
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      userName,
      email,
      bio: "",
      profilePicture: "",
      website: "",
    });

    batch.set(usersRef, {
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      userName,
      email,
      bio: "",
      profilePicture: "",
      website: "",
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = createAsyncThunk(
  "userDetail/getUserDetail",
  async (userId) => {
    try {
      const dataRef = doc(db, userId, "userData");

      const dataSnap = await getDoc(dataRef);

      if (dataSnap.exists()) {
        return dataSnap.data();
      }
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
