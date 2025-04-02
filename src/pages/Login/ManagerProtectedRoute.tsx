import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthValidation } from "../../hooks/useAuthValidation";
import { useUserStore } from "../../stores/UserStore";
import { Roles } from "../../interfaces/roles";

interface ProtectedRouteProps {
  user: any; // Cambia al tipo adecuado si tienes uno
}

const ManagerProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user, isLoading } = useUserStore();
  useAuthValidation();
  const userRoles = user?.user.authorities.map((role) => role.authority) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.user.authorities || !userRoles.includes(Roles.MANAGER)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ManagerProtectedRoute;

// eyJhbGciOiJIUzI1NiJ9
//   .eyJ1c2VyIjp7Im5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImFkcmlhbmRpYXptYW56YW5hcmVzOUBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoibWFuYWdlbWVudDp1cGRhdGUifSx7ImF1dGhvcml0eSI6Im1hbmFnZW1lbnQ6ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJtYW5hZ2VtZW50OnJlYWQifSx7ImF1dGhvcml0eSI6ImFkbWluOnJlYWQifSx7ImF1dGhvcml0eSI6Im1hbmFnZW1lbnQ6Y3JlYXRlIn0seyJhdXRob3JpdHkiOiJhZG1pbjp1cGRhdGUifSx7ImF1dGhvcml0eSI6ImFkbWluOmNyZWF0ZSJ9LHsiYXV0aG9yaXR5IjoiYWRtaW46ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJ2ZXJpZmllZCI6ZmFsc2V9LCJzdWIiOiJhZHJpYW5kaWF6bWFuemFuYXJlczlAZ21haWwuY29tIiwiaWF0IjoxNzQzNTg1Nzg0LCJleHAiOjE3NDM2NzIxODR9
//   .NWS_jPk45CdKER7nMbwJtxjcVmIqAD3_nr3vUtiEgVk;
