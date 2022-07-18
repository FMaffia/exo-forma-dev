import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Typography } from "@mui/material";
import { END_POINT_LOAD_IMAGE } from "../services/endpoint/URI_RESOURCES";
import { User } from "../model/models";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { drawnerMenu } from "../model/menuItems";
import { purple } from "@mui/material/colors";
import LinkIcon from "@mui/icons-material/Link";
import { includes } from "lodash";
import ConfirmDialog from "../components/misc/ConfirmDialog";
import { PROJECT_BOZZA, PROJECT_EDIT, PROJECT_ROOT_NEW } from "../utility/Routes";
import { useLocation, useNavigate } from "@tanstack/react-location";
import AddIcon from "@mui/icons-material/Add";
import ModeIcon from "@mui/icons-material/Mode";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const drawerWidth = 240;


const DrawnerLaterale = () => {
  const permissions: string[] = useSelector<RootState, string[]>(
    (state) => state.user.permissions
  );
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        position: "inherit!important",
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
      }}
    >
      <Box sx={{ overflow: "auto", position: "inherit!important" }}>
        <UserInfo />
        <Divider />
        <List>
          <Typography sx={{ p: 2, fontWeight: 600 }} variant={"button"} color={"inherit"}>
            <span style={{ color: purple[600] }}>Progetti formazione</span>
          </Typography>
          {drawnerMenu.map(menu => (
            <ListItem selected={location.history.location.pathname === menu.path} key={menu.menuLabel} disablePadding>
              <ListItemButton onClick={() => navigate({ to: menu.path })}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.menuLabel} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {includes(permissions, "WRITE") && <><Divider />
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
              <ListItemButton onClick={() => navigate({ to: PROJECT_EDIT })}>
                <ListItemIcon>
                  <ModeIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Modifica progetto" />
              </ListItemButton>
            </ListItem>
            <ListItem selected={location.history.location.pathname === PROJECT_BOZZA} disablePadding>
              <ListItemButton onClick={() => navigate({ to: PROJECT_BOZZA })}>
                <ListItemIcon>
                  <DesignServicesIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Progetti in bozza" />
              </ListItemButton>
            </ListItem>
          </List></>
        }
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
          }
          }
        />
      </Box>
    </Drawer>
  );
};

export default DrawnerLaterale;

const UserInfo = () => {
  const user: User = useSelector((state: RootState) => state.user);
  return (
    <>
      <Box sx={{
        display: "flex", flexDirection: "column", whiteSpace: "no-wrap", flexGrow: 3, alignItems: "center", px: 1,
        backgroundColor: "rgba(106, 27, 154, 0.08)"
      }}>
        <Avatar sx={{ width: "50%", p: 1, m: "auto", height: "auto" }} alt="Remy Sharp" src={END_POINT_LOAD_IMAGE + "?id=" + user.id + ".jpg"}
                variant="rounded" />

        <Typography sx={{ p: 1, fontWeight: 600, fontSize: "1.5rem" }} variant={"button"} color={"inherit"}>
          <span style={{ color: purple[600], textAlign: "center", lineHeight: "1rem" }}>{user.username}</span>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
          {user.permissions?.map((p, index) => (
            <Typography key={index} component="span" color="gray" variant="caption" sx={{ pr: 1, fontWeight: 600 }}>
              {p} {user.permissions?.length !== undefined && index !== user.permissions?.length - 1 && "-"}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  )
    ;
};
