import { logout, useCurrentUser } from "@/redux/api/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
  };
  const navItem = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] "
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] "
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] "
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Booking
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] "
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Compare
        </NavLink>


      </li>

      {
        user? (<li>
        <NavLink
          to={`/dashboard/${role}`}
          className={({ isActive }) =>
            isActive
              ? "text-[#1f746a] "
              : "hover:text-[#2A9D8F] hover:font-bold"
          }
        >
          Dashboard
        </NavLink>
      </li> 


        ):(
          null
        )
      }



    

      {/* <li>
        <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "text-[#1f746a] " : "hover:text-[#2A9D8F]")}>
          About Us
        </NavLink>
      </li> */}
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl font-bold">
          {" "}
          <span className="text-[#264653]">Turbo</span>{" "}
          <span className="text-[#2A9D8F]">Shine</span>{" "}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{navItem}</ul>
      </div>
      <div className="navbar-end ">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              {" "}
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <Link to="/login">Login</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
