import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { contextAuth } from "../firebase";
import { auth } from "../firebase";

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
