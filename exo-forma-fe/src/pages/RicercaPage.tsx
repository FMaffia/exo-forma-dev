import React from "react";
import { Box, Fade, Typography } from "@mui/material";
import { Div } from "../layout/CustomMui";
import useMyStyle from "../utility/useMyStyle";
import RisultatiRicerca from "../containers/ricerca/RisultatiRicerca";

const RicercaPage = () => {
  const { barraRicerca } = useMyStyle();
  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box>
        <Typography variant="h2" gutterBottom component="div">
          Progetti
        </Typography>
        <Div className={barraRicerca}>FILTRI RICERCA </Div>
        <Box sx={{ display: "flex" }}>
          <RisultatiRicerca />
        </Box>
      </Box>
    </Fade>
  );
};

export default RicercaPage;
