import { Outlet } from "react-router";
import { SidebarNav } from "../../components/sidebar-nav";

export default function DashboardLayoutBasic() {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
