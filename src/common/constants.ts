import { BarChart3Icon, HomeIcon, SettingsIcon, UsersIcon } from "lucide-react";

export const adminSidebarItems = [
  { title: "Inicio", href: "/admin", icon: HomeIcon },
  { title: "Proveedores", href: "/admin/providers", icon: UsersIcon },
  { title: "Empresas", href: "/admin/companies", icon: UsersIcon },
  { title: "Estadísticas", href: "/estadisticas", icon: BarChart3Icon },
  { title: "Configuración", href: "/configuracion", icon: SettingsIcon },
];