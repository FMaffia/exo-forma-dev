import React, { useEffect } from "react";
import { Avatar, Box, Fade, Paper, Typography } from "@mui/material";
import { useMatch } from "@tanstack/react-location";
import { upperCase } from "lodash";
import { Project } from "../model/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import ButtonBarDetails from "../components/buttons/ButtonBarDetails";
import { setSelectedProject } from "../store/reducers/selectedProject";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HeaderDetail from "../components/details/HeaderDetail";
import { tabsDetails } from "../model/tabsItems";
import { a11yProps, TabPanelProps } from "../layout/CustomMui";
import { END_POINT_LOAD_IMAGE } from "../services/endpoint/URI_RESOURCES";

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div" variant="subtitle1">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

const DetailsPage = () => {
  const {
    params: { projectPath }
  } = useMatch();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentProject: Project = useSelector<RootState, Project>(
    (state) => state.selectedProjects
  );
  const projects: Project[] = useSelector<RootState, Project[]>(
    (state) => state.projects
  );

  useEffect(() => {
    let found: Project | undefined = projects.find(
      (p) => upperCase(p.path) === upperCase(projectPath)
    );
    if (found) {
      dispatch(setSelectedProject(found));
    }
  }, []);

  return (
    <Fade timeout={1000} in={true} unmountOnExit>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Paper>
          <Box sx={{ display: "flex", background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)" }}>
            <Avatar
              alt={currentProject.title}
              variant="square"
              src={END_POINT_LOAD_IMAGE + "?id=" + currentProject.id + ".jpg"}
              sx={{ width: "20rem", height: "inherit" }}
            />
            <HeaderDetail currentProject={currentProject} />
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabsDetails(currentProject).map((t) => (
                <Tab
                  key={`key${t.index}`}
                  title={t.title}
                  label={t.label}
                  icon={t.icon}
                  {...a11yProps(t.index)}
                />
              ))}
            </Tabs>
          </Box>
          {tabsDetails(currentProject).map((t) => (
            <TabPanel key={`key${t.index}`} value={value} index={t.index}>
              {t.body}
            </TabPanel>
          ))}
        </Paper>
        <ButtonBarDetails />
      </Box>
    </Fade>
  );
};

export default DetailsPage;
