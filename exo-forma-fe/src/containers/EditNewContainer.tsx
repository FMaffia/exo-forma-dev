import React, { useEffect, useState } from "react";
import { useLocation, useMatch } from "@tanstack/react-location";
import { emptyProject, Project } from "../types/models";
import { cloneDeep, includes, upperCase } from "lodash";
import { useSelector } from "react-redux";
import { RootState, sagaAction } from "../store/store";
import { Box, Divider, Fade, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormInfo2 from "./forms/FormInfo";
import FormInfo from "./forms/FormInfo";
import FormSteps from "./forms/FormSteps";
import { PROJECT_EDIT } from "../utility/Routes";
import ButtonsNavEdit from "../components/buttons/ButtonsNavEdit.";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import FormDescrizione from "./forms/FormDescrizione";
import { SAGA_PROJECT } from "../saga/projectsSaga";

const styleStack = {
  justifyContent: "space-between",
  alignItems: "self-end"
};

const EditNewContainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
  const [backupCurrentProject, setBackupCurrentProject] = useState<Project>(emptyProject);
  const location = useLocation();
  const projects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.projects
  );
  const {
    params: { projectPath }
  } = useMatch();

  const isModifica = includes(location.history.location.pathname, PROJECT_EDIT);

  type ObjectKey = keyof typeof currentProject;

  const setField = (field: string, value: any) => {
    const myVar = field as ObjectKey;
    let copyCurrentProject: Project = cloneDeep(currentProject);
    // @ts-ignore
    copyCurrentProject[myVar] = value;
    setCurrentProject(copyCurrentProject);
  };
  const save = () => {
    if (isModifica) {
      if (currentProject.published) {
        //FE:Sostituisco l'elemento modificato alla lista dei progetti pubblicati
      } else {
        //FE: Rimuovo dalla lista progetti pubblicati e lo aggiungo alla lista dei progetti in bozza
      }
      //IN OGNI CASO
      //BE: UPDATE PROGETTO
    } else {
      if (currentProject.published) {
        //FE:Aggiungo il nuovo elemento modificato alla lista dei progetti pubblicati
      } else {
        //FE: aggiungo  il nuovo elemento  alla lista dei progetti in bozza
      }
      //IN OGNI CASO
      //BE: AGGIUNGO PROGETTO

      sagaAction(SAGA_PROJECT.INSERT_PROJECT, currentProject);

    }

  };
  const clear = () => {
    setCurrentProject(backupCurrentProject);
  };

  useEffect(() => {
    if (isModifica) {
      let found: Project | undefined = projects.find(
        (p) => upperCase(p.path) === upperCase(projectPath)
      );
      if (found) {
        setBackupCurrentProject(found);
        setCurrentProject(found);
      }
    }
  }, []);

  const navigationMap = [
    <FormInfo currentProject={currentProject} setField={setField} />,
    <FormDescrizione currentProject={currentProject} setField={setField} />,
    <FormSteps currentProject={currentProject} setField={setField} />,
    <FormInfo2 currentProject={currentProject} setField={setField} />
  ];
  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Stack direction="row" sx={styleStack}>
          <Typography variant="h2" gutterBottom component="div">
            {currentProject.id === undefined ? "Nuovo progetto" : backupCurrentProject.title}
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Switch onChange={(e) => setField("published", e.target.checked)} defaultChecked />}
                              label={<Typography variant="body1">Pubblicato</Typography>} />
          </FormGroup>
        </Stack>
        <Paper sx={{ padding: 3 }}>
          <Box>
            <BottomNavigation
              sx={{ justifyContent: "space-between" }}
              showLabels
              value={currentPage}
              onChange={(event, newValue) => {
                setCurrentPage(newValue);
              }}
            >
              <BottomNavigationAction label="Informazioni" icon={<ArchitectureOutlinedIcon fontSize="large" />} />
              <BottomNavigationAction label="Descrizione" icon={<ArchitectureOutlinedIcon fontSize="large" />} />
              <BottomNavigationAction label="Steps" icon={<PlaylistAddCheckOutlinedIcon fontSize="large" />} />
              <BottomNavigationAction label="Demo" icon={<PreviewIcon fontSize="large" />} />
            </BottomNavigation>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ padding: 3 }}>
            {navigationMap[currentPage]}
          </Box>
        </Paper>
        <ButtonsNavEdit clear={clear} save={save} />
      </Box>
    </Fade>
  )
    ;
};

export default EditNewContainer;