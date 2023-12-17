import { createBrowserRouter } from "react-router-dom";
import AuthVerification from "./authVerificationComponent";
import LocationPages from "../vehicles/aircraftPage";
import ErrorPage from "../pages/errorPage";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import Layout from "../pages/layoutPage";
import Home from "../pages/homePage";
import DepartmentsPage from "../pages/departmentPage";
import Airplanes from "../airplanes/airplanePage";
import SingleProperty from "../components/SingleProperty";
import SingleAircraft from "../components/SingleAircraft";

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
            path: "/airplanes",
            element: <Airplanes />,
          },
          { path: "/locations", element: <LocationPages /> },
          {
            path: "/departments",
            element: <DepartmentsPage />,
          },
          {
            path: "/properties/:id",
            element: <SingleProperty />,
          },
          {
            path: "/aircraft/:id",
            element: <SingleAircraft />,
          },
        ],
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
