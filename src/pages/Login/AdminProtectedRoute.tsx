import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthValidation } from "../../hooks/useAuthValidation";
import { useUserStore } from "../../stores/UserStore";
import { Roles } from "../../interfaces/roles";

interface ProtectedRouteProps {
  user: any; // Cambia al tipo adecuado si tienes uno
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user, isLoading } = useUserStore();
  useAuthValidation();
  const userRoles = user?.user.authorities.map((role) => role.authority) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.user.authorities || !userRoles.includes(Roles.ADMIN)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
