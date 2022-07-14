import { grey, lime, purple } from "@mui/material/colors";
import type { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/material/styles";
import { DefaultTheme } from "@mui/private-theming";

declare module "@mui/private-theming" {
  interface DefaultTheme extends Theme {}
}
// @ts-ignore
const useStyles = makeStyles((theme: DefaultTheme) => ({
  header: {
    background:
      "linear-gradient(0deg, rgba(70,0,112,1) 0%, rgba(78,25,143,1) 100%)",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  footer: {
    position: "fixed",
    width: "100wh",
    margin: 0,
    background:
      "linear-gradient(0deg, rgba(70,0,112,1) 0%, rgba(78,25,143,1) 100%)",
    alignItems: "center"
  },
  labelPanel: {
    fontFamily: "Anek Latin",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    color: theme.palette.primary
  },
  paper: {
    textAlign: "justifyContent",
    [theme.breakpoints.up("md")]: {
      margin: "2rem"
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(2)
    }
  },
  typography: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem!important"
    }
  },

  activeLinkMobile: {
    color: purple["800"]
  },
  menubar: {
    backgroundColor: lime.A400,
    maxWidth: "100%!important"
  },
  menuItemClass: {
    display: "flex",
    fontWeight: 600,
    color: purple["800"]
  },
  containerRicerca: {
    flexDirection: "row",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  stepStyle: {
    color: `${grey["600"]}!important`
  },
  completedStyle: {
    color: `${purple["800"]}!important`
  },
  activeStyle: {
    color: `${purple["400"]}!important`
  },
  lastStepStyle: {
    color: `${purple["900"]}!important`
  }

}));

const useMyStyle = () => {
  // @ts-ignore
  return useStyles();
};
export default useMyStyle as any;
