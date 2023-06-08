import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import RedirectPage from "./redirectComponent";

const AuthVerification = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  console.log(currentUser);
  return currentUser ? <Outlet /> : <RedirectPage />;
};

export default AuthVerification;
