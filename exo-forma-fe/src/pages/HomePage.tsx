import React from "react";
import { Avatar, Box, Fade, styled, Typography } from "@mui/material";
import { Project, User } from "../model/models";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { END_POINT_LOAD_IMAGE } from "../services/endpoint/URI_RESOURCES";
import EsploraProgettiCard from "../components/dashboard/EsploraProgettiCard";
import { PROJECT_ROOT } from "../utility/Routes";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";

const PaperUser = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  minHeight: "3rem",
  borderLeft: `${theme.spacing(1)} solid ${theme.palette.secondary.main}`,
  borderRadius: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center"
}));

const HomePage = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const list: Project[] = useSelector<RootState, Project[]>(
    (state) => state.filteredProjects
  );
  const progettiBozza: Project[] = [];
  const progettiInCorso: Project[] = [];
  const progettiCompletati: Project[] = [];

  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box>
        <PaperUser>
          <Avatar sx={{ width: 100, height: 100, m: 1 }} alt="Remy Sharp" src={END_POINT_LOAD_IMAGE + "?id=" + user.id + ".jpg"} />
          <Typography variant="h4" component="div" sx={{ padding: 2, whiteSpace: "no-wrap" }}>
            <span color="primary">{user.username}</span>
          </Typography>
          <Typography variant="caption" component="div" sx={{ padding: 2 }}>
            Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto
            standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
            campione.
          </Typography>
        </PaperUser>
        <EsploraProgettiCard
          title="Progetti in attesa di pubblicazione"
          subtitle="Ci sono ancora dei progetti che sono in attesa di essere pubblicati"
          icon={<DesignServicesOutlinedIcon sx={{ fontSize: "5rem", alignSelf: "center", color: "white" }} />}
          click={() => navigate(PROJECT_ROOT)}
          list={list}
          compact
        />
        <EsploraProgettiCard
          title="Progetti completati"
          subtitle="Complimenti hai portato a termine 13 progetti"
          icon={<FactCheckOutlinedIcon sx={{ fontSize: "5rem", alignSelf: "center", color: "white" }} />}
          click={() => navigate(PROJECT_ROOT)}
          compact={false}
          list={list}
        />

        <EsploraProgettiCard
          title="...Continua ad progettare"
          subtitle="Ci sono ancora dei progetti in sospeso che attendono di essere completati"
          icon={<HourglassBottomOutlinedIcon sx={{ fontSize: "5rem", alignSelf: "center", color: "white" }} />}
          click={() => navigate(PROJECT_ROOT)}
          compact={false}
          list={list}
        />
      </Box>
    </Fade>
  );
};

export default HomePage;
