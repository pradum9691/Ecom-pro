// layout/HomeLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {

  const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem("currentuser") || "null"))
  const navigate = useNavigate();
  console.log("currentUser", currentUser);
  
  const linkBase =
    "block px-4 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800";
  const active =
    "bg-gray-800 text-white";

  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex bg-radial-[at_25%_25%] from-black via-slate-950 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold">Ecom</h1>
        </div>

        <div className="px-4">
          {/* logged in card */}
          <div className="bg-slate-900/70 rounded-lg p-3 text-xs text-gray-300 mb-6">
            <p className="text-[10px] text-gray-400 mb-1">Logged in as:</p>
            <p>{currentUser.email}</p>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/home/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/home/users"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Users
            </NavLink>
          </nav>
        </div>

        {/* Logout bottom */}
        <div className="mt-auto px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-full bg-white text-black py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Logout
          </button>
          <p className="mt-4 text-[10px] text-gray-500">© Ecom App</p>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 px-8 py-6">
        {/* Top heading bar */}
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-400">
            Overview of your ecommerce app
          </p>
        </header>

        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
