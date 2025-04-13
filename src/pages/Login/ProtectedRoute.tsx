import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthValidation } from "../../common/hooks/useAuthValidation";
import { useUserStore } from "../../common/stores/UserStore";

interface ProtectedRouteProps {
  user: any; // Cambia al tipo adecuado si tienes uno
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user, isLoading } = useUserStore();
  useAuthValidation();

  if (isLoading) {
    return <div>Loading...</div>; // Mostrar un componente de carga mientras se verifica la autenticación
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza las rutas protegidas si el usuario está autenticado
};

export default ProtectedRoute;
