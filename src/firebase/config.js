// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUO0fweWQEZzbWS5WWOFKovzxE7Hy7pV0",
  authDomain: "autocrew-85315.firebaseapp.com",
  projectId: "autocrew-85315",
  storageBucket: "autocrew-85315.appspot.com",
  messagingSenderId: "652079500020",
  appId: "1:652079500020:web:2b509cf36a836334942ca1",
  measurementId: "G-0G54KRJ2VE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
