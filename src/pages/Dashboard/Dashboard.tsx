import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const sidebarLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] font-bold"
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] font-bold"
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] font-bold"
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] font-bold"
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Settings
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="py-5 px-6">
          <h2 className="text-xl font-bold text-[#2A9D8F] mb-5">Dashboard</h2>
          <ul className="menu p-2 space-y-2 text-lg">{sidebarLinks}</ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#264653]">Dashboard Overview</h1>
          <button
            className="rounded-md border border-slate-300 py-2 px-4 text-sm shadow-sm hover:bg-slate-800 hover:text-white transition-all"
            type="button"
          >
            Logout
          </button>
        </div>

        {/* Main content area */}
        <div className="p-6">
          {/* Add dashboard content here */}
          <h2 className="text-xl font-bold mb-4">Welcome to your dashboard!</h2>
          <p>This is where you can manage your products, orders, and account settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
