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
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered");
      } else {
        console.log(error.code);
        toast.error("Please try again later.");
      }
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
      if (error.code === "auth/user-not-found") {
        toast.error("You are not registerd with us. Please sign up.");
      }

      if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      }

      toast.error("Error occured. Please try again later.");
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
      toast.error("Error occured. Please try again later.");
    }
  }
);

export const logout = async () => {
  await signOut(auth);
};
