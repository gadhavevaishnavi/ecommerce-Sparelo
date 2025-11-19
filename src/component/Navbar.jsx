import React from "react";

import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 pb-3">
      <div></div>
    

      <nav className="flex gap-6 text-gray-600 font-medium flex-wrap ml-auto">
        <NavLink
          to="/myprofile"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2  border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          My Profile
        </NavLink>

        <NavLink
          to="/myorder"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          My Orders
        </NavLink>

        <NavLink
          to="/mywishlist"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          My Wishlists
        </NavLink>

        <NavLink
          to="/addresses"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          Addresses
        </NavLink>

        <NavLink
          to="/company_gst"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          Company/GST
        </NavLink>

        <NavLink
          to="/garage"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          My Garage
        </NavLink>

        <NavLink
          to="/document"
          className={({ isActive }) =>
            isActive
              ? "text-sky-600 border-b-2 border-sky-600 pb-2"
              : "hover:text-sky-600 hover:scale-110"
          }
        >
          My Documents
        </NavLink>
      </nav>
    </div>
  );
};
