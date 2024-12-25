import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../stores/UserStore";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const auth = useUserStore();

  return (
    <>
      {!auth.user && (
        <AppBar
          position="static"
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: "none",
          }}
        >
          <Toolbar>
            {
              // Show the menu icon only on mobile devices
              isMobile && (
                <IconButton edge="start" aria-label="menu"></IconButton>
              )
            }

            {!isMobile && (
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img
                  src="/logo.png"
                  alt="Logo CargoCompare"
                  style={{ height: 30 }}
                />
                CargoCompare
              </Button>
            )}

            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Button component={Link} to="/" color="inherit">
                Dashboard
              </Button>
              <Button component={Link} to="/transactions" color="inherit">
                Transactions
              </Button>
              <Button component={Link} to="/analysis" color="inherit">
                Analisys
              </Button>
              <Button component={Link} to="/support" color="inherit">
                Support
              </Button>
              <Button component={Link} to="/settings" color="inherit">
                Settings
              </Button>
            </Box>

            <Box>
              <Button
                component={Link}
                to="/login"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: "8px",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Acceder
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default NavBar;
