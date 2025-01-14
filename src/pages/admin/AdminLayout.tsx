import { extendTheme, styled } from "@mui/material/styles";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Apartment, LocalShipping } from "@mui/icons-material";

import { Outlet } from "react-router";
import { AppProvider } from "@toolpad/core/AppProvider";
import { NavigationItem } from "../ui/NavigationItem";
import { Box } from "@mui/material";

const NAVIGATION = [
  {
    kind: "header",
    title: "Contenidos",
  },
  {
    segment: "companies",
    title: "",
    icon: (
      <NavigationItem
        icon={<Apartment />}
        title="Companies"
        to="/admin/companies"
      />
    ),
  },
  {
    segment: "providers",
    title: "",
    icon: (
      <NavigationItem
        icon={<LocalShipping />}
        title="Providers"
        to="/admin/providers"
      />
    ),
  },
  {
    kind: "divider",
  },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: false },
  colorSchemeSelector: "class",
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      // Asumiendo que el menú lateral utiliza MuiDrawer
      styleOverrides: {
        paper: {
          width: "550px", // Ajusta este valor según necesites
        },
      },
    },
    MuiContainer: {
      // Asumiendo que el contenido principal usa MuiContainer
      styleOverrides: {
        root: {
          marginLeft: "30px", // Asegúrate de que coincide con el ancho del Drawer
        },
      },
    },
  },
});

export default function DashboardLayoutBasic(props: any) {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <></>,
        title: "CargoCompare",
      }}
    >
      <DashboardLayout
        sx={{
          backgroundColor: "#F8F9FD",
        }}
      >
        {/* <PageContainer>{router.getComponent()}</PageContainer> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
