import React from "react";
import { Project } from "../../types/models";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Typography } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import CircularProgress from "./CircularProgress";

const StepIndicator = () => {
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);
  const calculatePerc: number | undefined = currentProject.lastStep ? (currentProject.lastStep * 100) / currentProject.stepsCount : undefined;
  return <><Typography sx={{ p: 2, fontWeight: 600 }} variant={"button"} color={"inherit"}>
    <span style={{ color: purple[800] }}>Percentuale avanzamento</span>
  </Typography>
    <Box sx={{ display: "flex", justifyContent: "center", p: 2, pb: 0 }}>
      <CircularProgress size="6rem" value={calculatePerc === undefined ? 0 : calculatePerc} />
    </Box>
    <Typography sx={{ p: 2, fontWeight: 600, pt: 1, display: "flex", alignItems: "center", color: grey["400"], justifyContent: "center" }}
                variant={"button"}
                color={"inherit"}>
      {`Steps completati ${currentProject.lastStep}/${currentProject.stepsCount}`}
    </Typography></>;
};

export default StepIndicator;