import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { RootState, sagaAction } from "../../store/store";
import { SAGA_PROJECT } from "../../saga/projectsSaga";
import { generateProjectItems } from "../../model/menuItems";
import { MenuObject, Project } from "../../model/models";
import Title from "../header/Title";
import { useLocation, useNavigate } from "@tanstack/react-location";
import { useSelector } from "react-redux";
import useMyStyle from "../../utility/useMyStyle";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

const StyledMenuToolbar = styled(Toolbar)(({ theme }) => ({
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 95,
    backgroundColor: theme.palette.primary.main,
    borderBottom: `15.5px ${theme.palette.secondary.light} solid`
  }
}));
const MenuLaterale = () => {
  /*
  const userMenuItems: MenuObject[] = generateUserMenuItems();
*/
  const navigate = useNavigate();
  const location = useLocation();

  const [projectMenuItems, setProjectMenuItems] = useState<MenuObject[] | []>(
    []
  );
  const { menuItemClass }: any = useMyStyle();
  const projects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.projects
  );
  useEffect(() => {
    setProjectMenuItems(generateProjectItems());
  }, [projects]);

  const handleListItemClick = (menu: MenuObject) => {
    navigate({ to: menu.path });
  };
  useEffect(() => {
    sagaAction(SAGA_PROJECT.LOAD_PROJECTS);
  }, []);

  return (
    <div>
      <StyledMenuToolbar>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: { xs: "flex", sm: "none" }
          }}
        >
          <Title small />
        </Box>
      </StyledMenuToolbar>
      <Divider />
      <MenuList>
        {projectMenuItems.map((menu: MenuObject, index: number) => (
          <MenuItem
            selected={menu.path === location.history.location.pathname}
            onClick={(event) => handleListItemClick(menu)}
          >
            {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}

            <ListItemText>{menu.menuLabel}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
      {/*<Divider />
      <List>
        {userMenuItems.map((menu: MenuObject, index) => {
          index += +projectMenuItems.length;
          return (
            <ListItem key={menu.path} disablePadding>
              <ListItemButton
                selected={menu.path === location.history.location.pathname}
                onClick={(event) => handleListItemClick(menu)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.menuLabel} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>*/}
    </div>
  );
};

export default MenuLaterale;
