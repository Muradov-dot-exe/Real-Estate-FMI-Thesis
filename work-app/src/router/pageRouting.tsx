import { createBrowserRouter } from "react-router-dom";
import SignUp from "../auth/signUp";
import Home from "./HomePage";
import ErrorPage from "./errorPage";
import SignIn from "../auth/signIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
]);
