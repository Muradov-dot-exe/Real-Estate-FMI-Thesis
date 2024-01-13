import { createBrowserRouter } from "react-router-dom";
import AuthVerification from "./authVerificationComponent";
import ErrorPage from "../pages/errorPage";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import Layout from "../pages/layoutPage";
import Home from "../pages/homePage";
import Airplanes from "../airplanes/airplanePage";
import SingleProperty from "../components/SingleProperty";
import SingleAircraft from "../components/SingleAircraft";
import SingleVehicle from "../components/SingleVehicle";
import LuxuryVehicles from "../vehicles/vehiclesPage";
import AboutPage from "../pages/aboutPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
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
