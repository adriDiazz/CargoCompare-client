import { Outlet } from "react-router";
import { SidebarNav } from "../../components/sidebar-nav";
import AdminBreadcrump from "./AdminBreadcrump";

export default function DashboardLayoutBasic() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1">
        <AdminBreadcrump />
        <Outlet />
      </div>
    </div>
  );
}
