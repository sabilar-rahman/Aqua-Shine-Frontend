import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";
// import BookingManagement from "@/pages/Dashboard/Admin/BookingManagement";
import ServiceManagement from "@/pages/Dashboard/Admin/ServiceManagement";
import SlotManagement from "@/pages/Dashboard/Admin/SlotManagement";
// import UserManagement from "@/pages/Dashboard/Admin/UserManagement";

const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
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
