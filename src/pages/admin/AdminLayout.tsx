import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Apartment, LocalShipping } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Companies from "./Companies";
import Providers from "./Providers";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Contenidos",
  },
  {
    segment: "companies",
    title: "Companies",
    icon: <Apartment />,
  },
  {
    segment: "providers",
    title: "Providers",
    icon: <LocalShipping />,
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
});

function useDemoRouter(initialPath: string) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
      getComponent: () => {
        switch (pathname) {
          case "/companies":
            return <Companies />;
          case "/providers":
            return <Providers />;

          default:
            return (
              <Typography variant="h6">
                Select a category from the menu
              </Typography>
            );
        }
      },
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter("/admin");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <></>,
        title: "CargoCompare",
      }}
    >
      <DashboardLayout>
        <PageContainer>{router.getComponent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
