import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme"; // Import both themes
import NavBar from "./pages/ui/NavBar";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/Login/Login";
import HomePage from "./pages/home/HomePage";

import { useAuthValidation } from "./hooks/useAuthValidation";
import AdminPage from "./pages/admin/AdminPage";
import AdminVerificationPage from "./pages/admin/AdminVerificationPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Companies from "./pages/admin/Companies";
import Providers from "./pages/admin/Providers";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import { useUserStore } from "./stores/UserStore";

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
            minHeight: "100vh", // Ensures footer is at the bottom
          }}
        >
          <NavBar />
          <Routes>
            {/* Protected routes */}
            <Route element={<ProtectedRoute user={auth.user} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
                <Route path="companies" element={<Companies />} />
                <Route path="providers" element={<Providers />} />
                {/* Puedes añadir más rutas anidadas aquí */}
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
