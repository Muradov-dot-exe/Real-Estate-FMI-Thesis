import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Route } from "react-router-dom";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });
    return () => {
      listener();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => console.log(error));
  };

  if (authUser) {
    return <Route path="/products" />;
  } else {
    return <Route path="/" />;
  }
};

export default AuthDetails;
