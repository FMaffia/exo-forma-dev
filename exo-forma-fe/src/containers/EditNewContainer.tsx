import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {emptyProject, Project} from "../model/models";
import {includes, upperCase} from "lodash";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Box, Fade, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormProgetto from "./forms/FormProgetto";
import FormSteps from "./forms/FormSteps";
import {PROJECT_EDIT} from "../utility/Routes";

const EditNewContainer = () => {
    const [currentProject, setCurrentProject] = useState<Project>(emptyProject)
    const [currentPage, setCurrentPage] = useState<number>(0)

    const location = useLocation()
    const projects: Project[] = useSelector<RootState, Project[]>(
        (state) => state.projects
    );
    let {projectPath} = useParams();
    const isModifica = includes(location.pathname, PROJECT_EDIT)

    useEffect(() => {
        if (isModifica) {
            let found: Project | undefined = projects.find(
                (p) => upperCase(p.path) === upperCase(projectPath)
            );
            if (found) {
                setCurrentProject(found)
            }
        }
    }, [])

    const navigationMap = [
        <FormProgetto currentProject={currentProject}/>,
        <FormSteps currentProject={currentProject}/>
    ]
    return (
        <Fade timeout={1000} in={true} unmountOnExit>
            <Box sx={{width: "100%", mt: 1}}>
                <Typography variant="h2" gutterBottom component="div">
                    {currentProject.id === undefined ? "Nuovo progetto" : currentProject.title}
                </Typography>
                <Paper>
                    {navigationMap[currentPage]}
                </Paper>
            </Box>
        </Fade>
    );
};

export default EditNewContainer;