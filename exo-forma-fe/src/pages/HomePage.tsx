import React from "react";
import { Box, Button, Fade, Typography } from "@mui/material";
import { ProjectUser, User } from "../model/models";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import { useNavigate } from "react-router-dom";
import { PROJECT_ROOT } from "../utility/Routes";
import { Div } from "../layout/CustomMui";

const emptyArray: ProjectUser[] = [];
const HomePage = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box>
        <Typography variant="h2" gutterBottom component="div">
          Welcome <span color="primary">{user.username}</span>
        </Typography>
        <Div>
          Lorem Ipsum è un testo segnaposto utilizzato nel settore della
          tipografia e della stampa. Lorem Ipsum è considerato il testo
          segnaposto standard sin dal sedicesimo secolo, quando un anonimo
          tipografo prese una cassetta di caratteri e li assemblò per preparare
          un testo campione. È sopravvissuto non solo a più di cinque secoli, ma
          anche al passaggio alla videoimpaginazione, pervenendoci
          sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la
          diffusione dei fogli di caratteri trasferibili “Letraset”, che
          contenevano passaggi del Lorem Ipsum, e più recentemente da software
          di impaginazione come Aldus PageMaker, che includeva versioni del
          Lorem Ipsum 2.
        </Div>
        <Button
          size="large"
          startIcon={<OutlinedFlagRoundedIcon />}
          onClick={() => navigate(PROJECT_ROOT)}
        >
          Progetta{" "}
        </Button>
      </Box>
    </Fade>
  );
};

export default HomePage;
