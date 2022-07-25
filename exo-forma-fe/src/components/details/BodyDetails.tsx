import React from "react";
import { Project } from "../../types/models";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleIcon from "@mui/icons-material/Article";
import { CustomTitleAccordion } from "../../layout/CustomMui";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const CustomAccordion = styled(Accordion)(() => ({
  background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)",
  borderBottom: "3px #c6ff00 solid"
}));
const BodyDetails = () => {
  const currentProject: Project = useSelector<RootState, Project>((state) => state.selectedProjects);

  return (
    <div>
      <CustomAccordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ArticleIcon sx={{ color: "white", mr: 2 }} />
          <CustomTitleAccordion
            variant={"button"}
          >Descrizione </CustomTitleAccordion>
        </AccordionSummary>
        <AccordionDetails sx={{ background: "white" }}>
          <Typography>
            <span className="content" dangerouslySetInnerHTML={{ __html: currentProject.desc }} />
          </Typography>
        </AccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <AttachFileIcon sx={{ color: "white", mr: 2 }} />
          <CustomTitleAccordion variant={"button"}>Links & Files </CustomTitleAccordion>
        </AccordionSummary>
        <AccordionDetails sx={{ background: "white" }}>
          {[0, 1, 2, 3].map((value) =>
            <ListItemButton key={value} component="a" href="#simple-list">
              <ListItemIcon sx={{
                display: "flex",
                justifyContent: "end",
                marginRight: "1rem"
              }}>
                <LaunchIcon color={"primary"} />
              </ListItemIcon>
              <ListItemText primary={`https://mui.com/material-ui/react-list/#basic-list  ${value + 1}`} />
            </ListItemButton>)}
        </AccordionDetails>
      </CustomAccordion>
    </div>
  )
    ;
};

export default BodyDetails;