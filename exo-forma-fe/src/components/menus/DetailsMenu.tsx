import React from "react";
import { Divider, Typography } from "@mui/material";
import { PROJECT_ROOT_NEW } from "../../utility/Routes";
import { MenuObject, Project } from "../../types/models";
import ConfirmDialog from "../misc/ConfirmDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "@tanstack/react-location";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { purple } from "@mui/material/colors";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ArticleIcon from "@mui/icons-material/Article";
import StepIndicator from "../details/StepIndicator";

const DetailsMenu = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);
  const handleClick = (menu: MenuObject) => {
    let basePath = `/progetti/dettaglio/${currentProject.path}`;
    navigate({ to: basePath + menu.path });
  };
  return (
    <>
      <MenuList>
        <Typography sx={{ p: 2, fontWeight: 600, pb: 1, display: "flex", alignItems: "center" }}
                    variant={"h5"}>
          <ArticleIcon color={"primary"} sx={{ mr: 2 }} /> {currentProject.title}
        </Typography>
        <StepIndicator />
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <RestartAltRoundedIcon color={"primary"} />
          </ListItemIcon>
          <ListItemText>Ricomincia</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PlayCircleFilledWhiteIcon color={"primary"} />
          </ListItemIcon>
          <ListItemText>Riprendi dallo <span style={{ color: purple[800], fontWeight: "bold" }}> step {currentProject.lastStep}</span></ListItemText>
        </MenuItem>
      </MenuList>
      <ConfirmDialog
        body="Sei sicuro di voler riprendere da qui?"
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={() => {
          navigate({ to: PROJECT_ROOT_NEW });
          setOpen(false);
        }}
      /></>
  );
};

export default DetailsMenu;