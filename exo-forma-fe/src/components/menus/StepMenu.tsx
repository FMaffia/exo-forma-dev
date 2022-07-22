import React, { useState } from "react";
import List from "@mui/material/List";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PROJECT_ROOT_NEW } from "../../utility/Routes";
import { MenuObject, Project } from "../../types/models";
import ConfirmDialog from "../misc/ConfirmDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "@tanstack/react-location";
import { useGetStepsByIdQuery } from "../../api/projectsApi";
import { stepMenuFunc } from "../../types/menuItems";

const StepMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [stepSelected, setStepSelected] = useState(0);
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);
  const { data: steps, isLoading } = useGetStepsByIdQuery(currentProject.id, { skip: !currentProject.id });

  const handleClick = (menu: MenuObject) => {
    setStepSelected(menu.order);
    let basePath = `/progetti/dettaglio/${currentProject.path}`;
    navigate({ to: basePath + menu.path });
  };
  return (
    <><List>
      <Typography sx={{ p: 2, fontWeight: 600, pb: 1 }} variant={"h5"} color={"inherit"}>
        <span style={{ color: purple[600] }}>{currentProject.title}</span>
      </Typography>
      <Typography component={"div"} sx={{ px: 2, mb: 1 }} variant={"subtitle1"} color={"inherit"}>
        Seleziona lo step da cui vuoi riprendere a progettare
      </Typography>
      {steps && stepMenuFunc(steps).map(menu => (
        <ListItem selected={stepSelected === menu.order} key={menu.menuLabel} disablePadding>
          <ListItemButton onClick={() => handleClick(menu)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={`Step ${menu.order + 1}`} secondary={menu.menuLabel} />
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

export default StepMenu;