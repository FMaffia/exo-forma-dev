import React, { useEffect } from "react";
import { Backdrop, CircularProgress, Container, createTheme, CssBaseline, styled, ThemeProvider } from "@mui/material";
import { grey, lime, purple } from "@mui/material/colors";
import Title from "../components/header/Title";
import { PanelUtenteDesktop } from "../components/header/PanelUtenteDesktop";
import { Outlet } from "react-router-dom";
import { RootState, sagaAction } from "../store/store";
import { SAGA_PROJECT } from "../saga/projectsSaga";
import TitleFooter from "../components/footer/TitleFooter";
import DynamicBreadCrumb from "../utility/DynamicBreadCrumb";
import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "Anek Latin!important",
    h6: {
      fontWeight: "bold",
      color: grey["800"]
    }
  },
  palette: {
    background: {
      default: "#E9EEF1"
    },
    primary: {
      main: purple["800"],
      light: purple["900"],
      dark: purple["900"]
    },
    secondary: {
      main: lime.A400,
      light: lime.A400,
      dark: "#90cc00"
    }
  }
});

const ContainerHeader = styled(Container)(({ theme }) => ({
  "@media all": {
    minHeight: 100,
    display: "flex",
    padding: "1rem",
    background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)",
    borderBottom: `0.5rem ${theme.palette.secondary.light} solid`
  }
}));
const ContainerMain = styled(Container)(({ theme }) => ({
  "@media all": {
    minHeight: "90vh",
    display: "flex",
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexDirection: "column",
    backgroundColor: "#E9EEF1"
  }
}));
const ContainerFooter = styled(Container)(({ theme }) => ({
  "@media all": {
    minHeight: 100,
    display: "flex",
    padding: "1rem",
    background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)",
    borderTop: `0.5rem ${theme.palette.secondary.light} solid`
  }
}));

const Layout = () => {
  const loading = useSelector<RootState, boolean>(state => state.ui.loading);
  useEffect(() => {
    sagaAction(SAGA_PROJECT.LOAD_PROJECTS);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => null}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ContainerHeader maxWidth={false}>
        <Title />
        <PanelUtenteDesktop />
      </ContainerHeader>
      {/*<ContainerMenu maxWidth="xl">
        <MenuBar />
      </ContainerMenu>*/}
      <ContainerMain maxWidth={false}>
        <CssBaseline />
        <DynamicBreadCrumb />
        <Outlet />
      </ContainerMain>
      <ContainerFooter maxWidth={false}>
        <TitleFooter />
      </ContainerFooter>
    </ThemeProvider>
  );
};

export default Layout;
