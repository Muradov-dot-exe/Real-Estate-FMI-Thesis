import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const signupEndpoint = "http://localhost:4200/signup";
const signinEndpoint = "http://localhost:4200/signin";
const userInfoEndpoint = "http://localhost:4200/userinfo";
const signoutEndpoint = "http://localhost:3000/signout";

const userAuthContext = createContext({
  user: null,
  signUp: (email: string, password: string, displayName: string) => {},
  signIn: (username: string, password: string) => {},
  signOut: () => {},
  triggerResetEmail: (email: string) => {},
});

export const UserAuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const response = await axios.post(signupEndpoint, {
        email,
        password,
        username: displayName,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);

      await signIn(email, password);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(signinEndpoint, {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      console.error("Error during signin:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await axios.post(signoutEndpoint);

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error during signout:", error);
      throw error;
    }
  };

  const triggerResetEmail = async (email: string) => {
    // Trigger reset email logic using your backend
    // Example: await axios.post(resetEmailEndpoint, { email });
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const response = await axios.get(userInfoEndpoint, {
          withCredentials: true,
        });

        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        } else {
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);

        localStorage.removeItem("user");
        setUser(null);
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 3600000);
    checkTokenExpiration();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, signIn, signOut, triggerResetEmail }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
