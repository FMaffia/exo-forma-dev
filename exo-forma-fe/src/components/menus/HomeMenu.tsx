import React from "react";
import List from "@mui/material/List";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { drawnerMenu } from "../../types/menuItems";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { includes } from "lodash";
import Divider from "@mui/material/Divider";
import { PROJECT_BOZZA, PROJECT_EDIT, PROJECT_ROOT_NEW } from "../../utility/Routes";
import AddIcon from "@mui/icons-material/Add";
import { setMenuFilter } from "../../store/reducers/uiReducer";
import { MenuFilter, MenuObject } from "../../types/models";
import ModeIcon from "@mui/icons-material/Mode";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LinkIcon from "@mui/icons-material/Link";
import ConfirmDialog from "../misc/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLocation, useNavigate } from "@tanstack/react-location";
import UserInfo from "./UserInfo";
import useKeyRoles from "../../utility/useKeyRoles";

const HomeMenu = () => {
  const [open, setOpen] = React.useState(false);
  const currentFilter = useSelector<RootState, MenuFilter>(state => state.ui.menuFilter);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useKeyRoles();

  const handleClick = (menu: MenuObject) => {
    navigate({ to: menu.path });
    dispatch(setMenuFilter(menu.filter));
  };
  return (
    <>
      <UserInfo />
      <Divider />
      <List>
        <Typography sx={{ p: 2, fontWeight: 600 }} variant={"button"} color={"inherit"}>
          <span style={{ color: purple[600] }}>Progetti formazione</span>
        </Typography>
        {drawnerMenu.map(menu => (
          <ListItem selected={currentFilter === menu.filter} key={menu.menuLabel} disablePadding>
            <ListItemButton onClick={() => handleClick(menu)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.menuLabel} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {role === "ADMIN" && (
        <>
          <Divider />
          <List>
            <Typography sx={{ p: 2, fontWeight: 600 }} variant={"button"} color={"inherit"}>
              <span style={{ color: purple[600] }}>Gestisci progetti</span>
            </Typography>
            <ListItem selected={location.history.location.pathname === PROJECT_ROOT_NEW} disablePadding>
              <ListItemButton onClick={() => setOpen(true)}>
                <ListItemIcon>
                  <AddIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Crea nuovo progetto" />
              </ListItemButton>
            </ListItem>
            <ListItem selected={includes(location.history.location.pathname, "modifica")} disablePadding>
              <ListItemButton onClick={() => {
                dispatch(setMenuFilter(MenuFilter.BOZZA));
                navigate({ to: PROJECT_EDIT });
              }}>
                <ListItemIcon>
                  <ModeIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Modifica progetto" />
              </ListItemButton>
            </ListItem>
            <ListItem selected={location.history.location.pathname === PROJECT_BOZZA} disablePadding>
              <ListItemButton onClick={() => {
                dispatch(setMenuFilter(null));
                navigate({ to: PROJECT_BOZZA });
              }
              }>
                <ListItemIcon>
                  <DesignServicesIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Progetti in bozza" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      <Divider />
      <List>
        <Typography sx={{ p: 2, fontWeight: 600 }} variant={"button"} color={"inherit"}>
          <span style={{ color: purple[600] }}>Impostazioni account</span>
        </Typography>
        {["Exo User"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ConfirmDialog
        body="Sei sicuro di voler creare un nuovo progetto?"
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={() => {
          navigate({ to: PROJECT_ROOT_NEW });
          setOpen(false);
        }}
      /></>
  );
};

export default HomeMenu;