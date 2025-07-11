import { Route, Routes, useLocation } from "react-router";

import NavBar from "./pages/ui/NavBar";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/Login/Login";

import AdminVerificationPage from "./pages/admin/AdminVerificationPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Companies from "./pages/admin/companies/Companies";
import Providers from "./pages/admin/providers/Providers";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import { UserState } from "./common/stores/UserStore";
import CompanyDetail from "./pages/admin/companies/CompanyDetail";
import AdminProtectedRoute from "./pages/Login/AdminProtectedRoute";

import ManagerProtectedRoute from "./pages/Login/ManagerProtectedRoute";
import CompanyProviderDetail from "./pages/admin/companies/CompanyProviderDetail";
import { PageHeader } from "./common/components/page-header";

import { Box } from "@radix-ui/themes";
import ProviderDetail from "./pages/admin/providers/ProviderDetail";
import Users from "./pages/admin/users/Users";

const AppContent = ({ auth }: { auth: UserState }) => {
  const location = useLocation();
  const hiddenHeaderRoutes = ["/", "/login", "/admin-verification"];

  const showPageHeader = !hiddenHeaderRoutes.includes(location.pathname);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      {showPageHeader && <PageHeader />}
      {/* {isAdminRoute && <AdminBreadcrump />} */}
      <Routes>
        {/* Protected routes */}
        <Route element={<AdminProtectedRoute user={auth.user} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="companies" element={<Companies />} />
            <Route path="providers" element={<Providers />} />
            <Route path="users" element={<Users />} />

            <Route path="providers/:id" element={<ProviderDetail />} />
            <Route path="companies/:id" element={<CompanyDetail />} />
            <Route path="users/:id" element={<CompanyDetail />} />

            <Route
              path="companies/:companyId/provider/:providerId"
              element={<CompanyProviderDetail />}
            />
          </Route>
        </Route>

        <Route element={<ManagerProtectedRoute user={auth.user} />}>
          <Route path="/manager" element={<AdminLayout />}>
            <Route path="companies" element={<Companies />} />
            <Route path="providers" element={<Providers />} />
            <Route path="companies/:id" element={<CompanyDetail />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute user={auth.user} />}>
          <Route path="/home" element={<AdminLayout />}>
            <Route path="companies" element={<Companies />} />
            <Route path="providers" element={<Providers />} />
            <Route path="companies/:id" element={<CompanyDetail />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/admin-verification" element={<AdminVerificationPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Not found route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Box>
  );
};

export default AppContent;
