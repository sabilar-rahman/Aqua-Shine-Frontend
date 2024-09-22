/* eslint-disable @typescript-eslint/no-unused-vars */
import adminRoutes from "@/routes/adminRoutes";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
// import { adminPaths } from "../../routes/admin.route";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const role = "admin";
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminRoutes, userRole.ADMIN);
      break;
  

    default:
      break;
  }
  return (
    
    <></>
  );
};

export default Sidebar;