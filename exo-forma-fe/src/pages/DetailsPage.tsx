import React, { useEffect } from "react";
import { Avatar, Box, Fade, Paper } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { upperCase } from "lodash";
import { Project } from "../types/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ButtonBarDetails from "../components/buttons/ButtonBarDetails";
import { setSelectedProject } from "../store/reducers/selectedProject";
import HeaderDetail from "../components/details/HeaderDetail";
import { END_POINT_LOAD_IMAGE } from "../services/endpoint/URI_RESOURCES";
import { useGetProjectsQuery } from "../api/projectsApi";
import DetailsStep from "./DetailsStep";


const DetailsPage = () => {
  const {
    params: { projectPath }
  } = useMatch();
  const dispatch = useDispatch();
  const { data: projects, isLoading } = useGetProjectsQuery(null);
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);

  useEffect(() => {
    if (projects !== undefined) {
      let found: Project | undefined = projects.find(
        (p) => upperCase(p.path) === upperCase(projectPath)
      );
      if (found) {
        dispatch(setSelectedProject(found));
      }
    }
  }, []);

  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Paper>
          <Box sx={{ display: "flex", background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)" }}>
            {currentProject && <Avatar
              alt={currentProject.title}
              variant="square"
              src={END_POINT_LOAD_IMAGE + "?id=" + currentProject.id + ".jpg"}
              sx={{ width: "20rem", height: "inherit" }}
            />}
            <HeaderDetail currentProject={currentProject} />
          </Box>
          <DetailsStep />
        </Paper>
        <ButtonBarDetails />
      </Box>
    </Fade>
  );
};

export default DetailsPage;
