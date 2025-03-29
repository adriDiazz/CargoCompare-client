import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme";
import NavBar from "./pages/ui/NavBar";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/Login/Login";
import { useAuthValidation } from "./hooks/useAuthValidation";
import AdminVerificationPage from "./pages/admin/AdminVerificationPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Companies from "./pages/admin/companies/Companies";
import Providers from "./pages/admin/providers/Providers";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import { useUserStore } from "./stores/UserStore";
import CompanyDetail from "./pages/admin/companies/CompanyDetail";
import AdminProtectedRoute from "./pages/Login/AdminProtectedRoute";
import ManagerLayout from "./pages/companyManager/ManagerLayout";
import ManagerProtectedRoute from "./pages/Login/ManagerProtectedRoute";

function App() {
  const auth = useUserStore();
  useAuthValidation();

  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <NavBar />

          <Routes>
            {/* Protected routes */}
            <Route element={<AdminProtectedRoute user={auth.user} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="companies" element={<Companies />} />
                <Route path="providers" element={<Providers />} />
                <Route path="companies/:id" element={<CompanyDetail />} />
              </Route>
            </Route>

            <Route element={<ManagerProtectedRoute user={auth.user} />}>
              <Route path="/manager" element={<ManagerLayout />}>
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
            <Route
              path="/admin-verification"
              element={<AdminVerificationPage />}
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Not found route */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
