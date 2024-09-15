import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

const InsProtectedRoute = ({
  isInAuth,
  loading,
  children,
  redirectPath = "/instructer",
}) => {
  if (loading) {
    return (
      <div>
        <CircularProgress size={24} /> Loading...
      </div>
    );
  }
  return isInAuth ? children : <Navigate to={redirectPath} />;
};

export default InsProtectedRoute;
