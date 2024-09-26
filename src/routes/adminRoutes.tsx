
import CreateSlot from "@/pages/Dashboard/Admin/CreateSlot";
// import BookingManagement from "@/pages/Dashboard/Admin/BookingManagement";
import ServiceManagement from "@/pages/Dashboard/Admin/ServiceManagement";
import SlotManagement from "@/pages/Dashboard/Admin/SlotManagement";
import UserBookings from "@/pages/Dashboard/Admin/UserBookings";
import UserManagement from "@/pages/Dashboard/Admin/UserManagement";
import Dashboard from "@/pages/Dashboard/User/Dashboard";
// import UserManagement from "@/pages/Dashboard/Admin/UserManagement";

const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: < Dashboard/>,
  },
  {
    name: "User Management",
    children: [
      {
        name: "User Bookings",
        path: "user-bookings",
        element: <UserBookings />,
      },
      {
        name: "User Management",
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
  {
    name: "Create Slot",
    path: "create-slot",
    element: <CreateSlot />,
  },
  {
    name: "Service Management",
    path: "serviceManagement",
    element: <ServiceManagement />,
  },
  {
    name: "Slot Management",
    path: "slotManagement",
    element: <SlotManagement />,
  },
];
export default adminRoutes;
