// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsxREGwkqtcRauOLSW4NdcGPmW1HW5CQM",
  authDomain: "typescript-demo-6da57.firebaseapp.com",
  projectId: "typescript-demo-6da57",
  storageBucket: "typescript-demo-6da57.appspot.com",
  messagingSenderId: "422569775093",
  appId: "1:422569775093:web:61f395804b80f2445edabc",
  measurementId: "G-WJL9LJZ8BY",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
