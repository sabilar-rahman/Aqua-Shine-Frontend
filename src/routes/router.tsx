import path from "path";
import { createBrowserRouter } from "react-router-dom";
import RootMain from "./RootMain";


import Services from "@/pages/Services/Services";
import Booking from "@/pages/Booking/Booking";
import Compare from "@/pages/Compare/Compare";
import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout";

import Register from "@/pages/AuthPage/Register";
import { routesGenerator } from "@/utils/routeGenerator";
import adminRoutes from "./adminRoutes";
import Login from "@/pages/AuthPage/Login";
import ErrorPage from "@/utils/ErrorPage";
import { userRoutes } from "./userRoutes";
import HomePage from "@/pages/home/HomePage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootMain />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      }
      ,
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
    path: "/dashboard/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminRoutes),
  },
  {
    path:"/dashboard/user",
    element:<DashboardLayout/>,
    children:routesGenerator(userRoutes),

  }


]);

export default router;
