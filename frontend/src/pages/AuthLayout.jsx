import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;