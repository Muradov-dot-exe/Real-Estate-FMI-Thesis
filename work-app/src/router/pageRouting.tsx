import { createBrowserRouter } from "react-router-dom";
import SignUp from "../auth/signUp";
import Home from "./HomePage";
import ErrorPage from "./errorPage";
import SignIn from "../auth/signIn";
import ProductsPages from "../products/productsPage";

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
  {
    path: "/products",
    element: <ProductsPages />,
    errorElement: <ErrorPage />,
  },
]);
