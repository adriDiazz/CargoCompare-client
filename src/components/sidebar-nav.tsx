import { Link, useLocation } from "react-router";
import {
  TruckIcon,
  HomeIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button"; // Ajusta si usas shadcn/ui o similar
import { cn } from "../lib/utils";

const sidebarItems = [
  { title: "Inicio", href: "/home", icon: HomeIcon },
  { title: "Proveedores", href: "/proveedores", icon: UsersIcon },
  { title: "Empresas", href: "/", icon: UsersIcon },
  { title: "Estadísticas", href: "/estadisticas", icon: BarChart3Icon },
  { title: "Configuración", href: "/configuracion", icon: SettingsIcon },
];

const adminSidebarItems = [
  { title: "Inicio", href: "/admin", icon: HomeIcon },
  { title: "Proveedores", href: "/admin/providers", icon: UsersIcon },
  { title: "Empresas", href: "/admin/companies", icon: UsersIcon },
  { title: "Estadísticas", href: "/estadisticas", icon: BarChart3Icon },
  { title: "Configuración", href: "/configuracion", icon: SettingsIcon },
];

export function SidebarNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentItems = pathname.startsWith("/admin")
    ? adminSidebarItems
    : sidebarItems;

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r transition-transform md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Link to="/home" className="flex items-center">
              <img
                src="/logo.png"
                alt="CargoCompare logo"
                width={300}
                height={40}
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {currentItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center p-2 rounded-lg group hover:bg-gray-100",
                      pathname === item.href
                        ? "bg-teal-50 text-teal-600"
                        : "text-gray-700"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 mr-3 transition duration-75",
                        pathname === item.href
                          ? "text-teal-600"
                          : "text-gray-500 group-hover:text-gray-700"
                      )}
                    />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t p-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} CargoCompare</p>
            <p>Versión 1.0</p>
          </div>
        </div>
      </aside>

      {/* Desktop spacer */}
      <div className="hidden md:block w-64 shrink-0"></div>
    </>
  );
}
