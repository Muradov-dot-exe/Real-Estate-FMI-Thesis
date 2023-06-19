import { createBrowserRouter } from "react-router-dom";
import AuthVerification from "./authVerificationComponent";
import ProductsPages from "../products/productsPage";
import LocationPages from "../locations/locationsPage";
import ErrorPage from "../pages/errorPage";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import Layout from "../pages/layoutPage";
import Home from "../pages/homePage";
import DepartmentsPage from "../pages/departmentPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <AuthVerification />,
        children: [
          {
            path: "/products",
            element: <ProductsPages />,
          },
          { path: "/locations", element: <LocationPages /> },
          {
            path: "/departments",
            element: <DepartmentsPage />,
          },
        ],
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
