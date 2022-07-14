import React from "react";
import { Project } from "../../model/models";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Grid } from "@mui/material";
import CardProject from "../../components/ricerca/CardProject";


const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16
};
const RisultatiRicerca = () => {
  const filteredProjects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.filteredProjects
  );

  return (
    <Box
      sx={{
        position: "relative"
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "left" }}
      >
        {filteredProjects.map((fp) => (
          <Grid key={fp.id} item xs={12} sm={6} md={4} lg={3} xl={4}>
            <CardProject project={fp} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RisultatiRicerca;
