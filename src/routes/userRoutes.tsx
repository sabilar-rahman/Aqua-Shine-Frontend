import ManageProfile from "@/pages/Dashboard/User/ManageProfile";
import PastBookings from "@/pages/Dashboard/User/PastBookings";
import UpcomingBookings from "@/pages/Dashboard/User/UpcomingBookings";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";

export const userRoutes = [
    {
      name: "Dashboard",
      path: "dashboard",
      element: <UserDashboard />,
    },
    {
      name: "Manage profile",
      path: "manage-profile",
      element: <ManageProfile />,
    },
    {
      name: "Past bookings",
      path: "past-bookings",
      element: <PastBookings />,
    },
    {
      name: "Upcoming bookings",
      path: "Upcoming-bookings",
      element: <UpcomingBookings />,
    }
   
  ];