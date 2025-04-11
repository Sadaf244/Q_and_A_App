import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-semibold">Q&A Portal</h1>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">
          Logout
        </button>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;