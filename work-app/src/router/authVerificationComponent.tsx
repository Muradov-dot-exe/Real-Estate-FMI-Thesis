import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useUserAuth } from "../context/authContext";
import RedirectPage from "./redirectComponent";

const AuthVerification = () => {
  const { user } = useUserAuth();

  return user ? <Outlet /> : <RedirectPage />;
};

export default AuthVerification;
