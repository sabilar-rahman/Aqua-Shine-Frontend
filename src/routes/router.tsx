import path from "path";
import { createBrowserRouter } from "react-router-dom";
import RootMain from "./RootMain";
import Dashboard from "@/pages/Dashboard/Admin/AdminDashboard";
import ErrorPage from "@/utils/ErrorPage";
import Services from "@/pages/Services/Services";
import Booking from "@/pages/Booking/Booking";
import Compare from "@/pages/Compare/Compare";
import { routesGenerator } from "@/utils/routeGenerator";
import adminRoutes from "./adminRoutes";
import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";

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
    path: "/admin",
    element: <AdminDashboard />,
    children : routesGenerator(adminRoutes),
  },
]);

export default router;
