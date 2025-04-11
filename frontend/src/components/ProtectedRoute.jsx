import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { access, authReady } = useContext(AuthContext);
  const location = useLocation();

  if (!authReady) return <div className="text-center p-6">Loading...</div>;

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;