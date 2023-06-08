import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import RedirectPage from "./redirectComponent";

const AuthVerification = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  return currentUser ? <Outlet /> : <RedirectPage />;
};

export default AuthVerification;
