import { useNavigate } from "react-router";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect } from "react";

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

  useEffect(() => {
    // const xpath = '//*[@id="root"]/div/div/div[2]/div/nav/ul/li[1]/a/div[1]';
    // const element = document.evaluate(
    //   xpath,
    //   document,
    //   null,
    //   XPathResult.FIRST_ORDERED_NODE_TYPE,
    //   null
    // ).singleNodeValue;
    // if (element) {
    //   element.style.width = "100%";
    // }
  }, []);

  return (
    <ListItemButton onClick={handleNavigation} sx={{ paddingLeft: "0px" }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
