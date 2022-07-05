import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Fade, IconButton, styled, useTheme } from "@mui/material";
import { PanelUtenteDesktop } from "../components/header/PanelUtenteDesktop";
import MenuIcon from "@mui/icons-material/Menu";
import MenuLaterale from "../components/menus/MenuLaterale";
import Title from "../components/header/Title";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}
const StyledColorToolbar = styled(Toolbar)(({ theme }) => ({
  "@media all": {
    minHeight: 80,
    backgroundColor: theme.palette.primary.main,
  },
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  "@media all": {
    minHeight: 100,
    padding: "1rem",
  },
}));
const NavigationDrawer = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            flexDirection: "row",
            alignItems: "center",
            borderBottom: `1rem ${theme.palette.secondary.light} solid`,
            boxShadow: "none",
          }}
        >
          <StyledColorToolbar>
            {/*Visualizzazione mobile*/}
            <Box
              sx={{
                justifyContent: "start",
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Title />
          </StyledColorToolbar>
          <PanelUtenteDesktop />
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "0",
              },
            }}
          >
            <MenuLaterale />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "0",
                backgroundColor: grey[200],
              },
            }}
            open
          >
            <MenuLaterale />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <StyledToolbar />
          <Fade in={true} unmountOnExit>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Outlet />
            </Box>
          </Fade>
        </Box>
      </Box>
    </>
  );
};

export default NavigationDrawer;
