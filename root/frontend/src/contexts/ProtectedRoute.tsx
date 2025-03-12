import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext"; // adjust the path as needed

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content.
  return children;
};

export default ProtectedRoute;
