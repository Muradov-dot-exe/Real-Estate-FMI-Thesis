import { createBrowserRouter } from "react-router-dom";
import AuthVerification from "./authVerificationComponent";
import ErrorPage from "../pages/errorPage";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import Layout from "../pages/layoutPage";
import Home from "../pages/homePage";
import DepartmentsPage from "../pages/departmentPage";
import Airplanes from "../airplanes/airplanePage";
import SingleProperty from "../components/SingleProperty";
import SingleAircraft from "../components/SingleAircraft";
import SingleVehicle from "../components/SingleVehicle";
import LuxuryVehicles from "../vehicles/vehiclesPage";

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
          { path: "/vehicles", element: <LuxuryVehicles /> },
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
          {
            path: "/vehicle/:id",
            element: <SingleVehicle />,
          },
        ],
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
