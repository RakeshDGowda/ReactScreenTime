import React from "react";
import { authService } from "../../services/authService";
import { Navigate, Outlet } from "react-router-dom";
import type { JwtDEtails } from "../../types/types";

type Props = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const tokendetails: JwtDEtails | null = authService.getJwt();

  console.log(tokendetails);
  console.log(allowedRoles);

  if (!tokendetails) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(tokendetails.role || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
