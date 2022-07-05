import { MenuObject, Project } from "./models";
import * as ROUTES_CONSTANTS from "../utility/Routes";
import { PROJECT_ROOT, USER_ROOT } from "../utility/Routes";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { store } from "../store/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { sortBy } from "lodash";
import React from "react";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

const projectMenuItem: MenuObject = {
  menuLabel: "Progetti",
  order: 0,
  path: PROJECT_ROOT,
  icon: <AppsOutlinedIcon color={"primary"} fontSize="small" />,
};

export const generateProjectItems = (): MenuObject[] => {
  let projects: Project[] = store.getState().projects;
  let menuItems: MenuObject[] = [];
  menuItems = projects.map((a) => {
    return {
      menuLabel: a.title,
      order: a.order,
      path: PROJECT_ROOT + a.path,
      icon: <FeedOutlinedIcon sx={{ ml: 4, mr: 1 }} fontSize="small" />,
    };
  });
  menuItems.push(projectMenuItem);
  return sortBy(menuItems, [(a) => a.order, "asc"]);
};
export const generateUserMenuItems = (): MenuObject[] => {
  return [
    {
      menuLabel: "Il mio profilo",
      order: 0,
      path: USER_ROOT + ROUTES_CONSTANTS.MY_PROFILE,
      icon: <AccountCircleIcon sx={{ mr: 2 }} />,
    },
    {
      menuLabel: "Modifica profilo",
      order: 0,
      path: USER_ROOT + ROUTES_CONSTANTS.EDIT_PROFILE,
      icon: <EditOutlinedIcon sx={{ mr: 2 }} />,
    },
    {
      menuLabel: "Logout",
      order: 0,
      path: USER_ROOT + ROUTES_CONSTANTS.LOGOUT_ROOT,
      icon: <ExitToAppOutlinedIcon sx={{ mr: 2 }} />,
    },
  ];
};
