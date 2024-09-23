import path from "path";
import { createBrowserRouter } from "react-router-dom";
import RootMain from "./RootMain";

import ErrorPage from "@/utils/ErrorPage";
import Services from "@/pages/Services/Services";
import Booking from "@/pages/Booking/Booking";
import Compare from "@/pages/Compare/Compare";
import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout";

import Register from "@/pages/AuthPage/Register";
import { routesGenerator } from "@/utils/routeGenerator";
import adminRoutes from "./adminRoutes";
import Login from "@/pages/AuthPage/Login";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootMain />,
    errorElement: ErrorPage(),
    children: [
      {
        path: "/services",
        element: <Services />,
      },

      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/compare",
        element: <Compare />,
      },
    ],
  },
  {
    path: "/login",
    element: < Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminRoutes),
  },


]);

export default router;
