import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsxREGwkqtcRauOLSW4NdcGPmW1HW5CQM",
  authDomain: "typescript-demo-6da57.firebaseapp.com",
  projectId: "typescript-demo-6da57",
  storageBucket: "typescript-demo-6da57.appspot.com",
  messagingSenderId: "422569775093",
  appId: "1:422569775093:web:61f395804b80f2445edabc",
  measurementId: "G-WJL9LJZ8BY",
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const contextAuth = getAuth(app);
export const firestore = getFirestore(app);

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
