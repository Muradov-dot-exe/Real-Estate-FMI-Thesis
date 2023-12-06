import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { contextAuth } from "../firebase";
import { auth, firestore } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const userAuthContext = createContext({
  user: "",
  signUp: (email: string, password: string, displayName: string) => {},
  signIn: (email: string, password: string) => {},
  triggerResetEmail: (email: string) => {},
});

export const UserAuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState("");

  const signUp = (email: string, password: string, displayName: string) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const userRolesRef = doc(firestore, "roles", user!.uid);
        setDoc(userRolesRef, { role: "visitor", email: user?.email });
        console.log(userRolesRef);

        user?.updateProfile({
          displayName,
        });
      });
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(contextAuth, email, password);
  };

  const triggerResetEmail = (email: string) => {
    return sendPasswordResetEmail(contextAuth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(contextAuth, (currentUser: any) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, signIn, triggerResetEmail }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(userAuthContext);
}
