import { useState } from "react";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme";
import { useAuthValidation } from "./hooks/useAuthValidation";
import { useUserStore } from "./stores/UserStore";

import AppContent from "./routes";
import { Theme } from "@radix-ui/themes";

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
        <Theme>
          <AppContent auth={auth} />
        </Theme>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
