import { createAsyncThunk } from "@reduxjs/toolkit";
import { writeBatch, doc, getDoc } from "firebase/firestore";
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
