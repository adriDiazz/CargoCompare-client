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

function App() {
  const [count, setCount] = useState(0);

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
            {/* <Route
              element={
                <ProtectedRoute isAuthenticated={auth.isAuthenticated} />
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<SupportPage />} />
            </Route> */}

            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />

            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

            {/* Not found route */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
