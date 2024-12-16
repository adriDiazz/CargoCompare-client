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
import { Link } from "react-router";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
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
            isMobile && <IconButton edge="start" aria-label="menu"></IconButton>
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

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
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
            <Button component={Link} to="/login" color="primary">
              Acceder
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
