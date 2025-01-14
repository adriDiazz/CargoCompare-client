import { useNavigate } from "react-router";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface NavigationItemProps {
  title: string;
  icon: JSX.Element;
  to: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  icon,
  to,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <ListItemButton onClick={handleNavigation} sx={{ paddingLeft: "0px" }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
