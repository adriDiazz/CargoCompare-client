import { Link, Navigate, Outlet, useNavigate } from "react-router";
import { useUserStore } from "../../stores/UserStore";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Apartment, LocalShipping } from "@mui/icons-material";

const AdminPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const userRoles = user?.user.authorities.map((role) => role.authority);
  console.log(user);

  // if (!user) {
  //   navigate("/login");
  // } else {
  //   if (!userRoles?.includes("ADMIN")) {
  //     navigate("/home");
  //   }
  // }

  return (
    <>
      <Box></Box>
    </>
  );
};

export default AdminPage;
