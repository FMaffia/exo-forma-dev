import React from "react";
import { useMatch } from "@tanstack/react-location";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useGetStepByNumberQuery } from "../api/projectsApi";
import { Project } from "../types/models";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const DetailsStep = () => {
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);
  const {
    params: { numberStep }
  } = useMatch();
  const { data: step, isLoading } = useGetStepByNumberQuery({ idProject: currentProject.id, number: +numberStep });


  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Typography variant="h3" gutterBottom component="div">
        {step && step.title}
      </Typography>
    </Box>
  );
};

export default DetailsStep;
