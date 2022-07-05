import React from "react";
import { Project } from "../../model/models";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Grid } from "@mui/material";
import CardProject from "./CardProject";

const RisultatiRicerca = () => {
  const filteredProjects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.filteredProjects
  );
  const myProjects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.filteredProjects
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {filteredProjects.map((fp) => (
        <Grid key={fp.id} item xs={11} sm={6} md={4} lg={3}>
          <CardProject project={fp} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RisultatiRicerca;
