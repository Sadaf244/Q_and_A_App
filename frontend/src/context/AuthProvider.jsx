import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    const user = localStorage.getItem("user");
    return {
      access,
      refresh,
      user: user ? JSON.parse(user) : null,
      authReady: !!access
    };
  });

  const setAuth = (data) => {
    if (data) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthData({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
        authReady: true
      });
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setAuthData({
        access: null,
        refresh: null,
        user: null,
        authReady: false
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authData, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};