import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Link, useLocation } from "react-router";
import { adminSidebarItems } from "../../common/constants";

const AdminBreadcrump = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Reconstruimos el path progresivamente
  const breadcrumbs = pathSegments.map((_, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      href,
      label:
        adminSidebarItems.find((item) => item.href === href)?.title ||
        decodeURIComponent(pathSegments[index]), // fallback por si es un id dinámico
    };
  });

  return (
    <div className="container flex items-center justify-start gap-3 md: ml-[255px]">
      <Breadcrumb className="pt-10">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {i === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AdminBreadcrump;
