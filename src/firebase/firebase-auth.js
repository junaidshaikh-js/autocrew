import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserDb } from "./firebase-calls";
import toast from "react-hot-toast";

import { auth } from "./config";

export const signup = createAsyncThunk(
  "userDetail/signup",
  async (signupFormValues) => {
    const { firstName, lastName, userName, email, password } = signupFormValues;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDb(firstName, lastName, userName, email, user.uid);

      toast.success("Sign up successful");
      return user.uid;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "userDetail/login",
  async (loginFormValues) => {
    const { email, password } = loginFormValues;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      toast.success("Log in successful");
      return user.uid;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginAsGuest = createAsyncThunk(
  "userDetail/loginAsGuest",
  async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        "sj.shaikhjunaid@gmail.com",
        "123456"
      );

      toast.success("Log in successful");
      return user.uid;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = async () => {
  await signOut(auth);
};
