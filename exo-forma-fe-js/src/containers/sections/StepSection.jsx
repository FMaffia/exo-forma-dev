import React from 'react';
import {useParams} from "react-router-dom";
import {useGetDetailsQuery} from "../../api/projectsApi";
import Drawer from "@mui/material/Drawer";
import {drawerWidth} from "../../components/mui/theme";
import Skeleton from "react-loading-skeleton";
import StepMenu from "../../components/menus/StepMenu";
import StepBC from "../../components/breadcrumbs/StepBC";
import StepContainer from "../steps/StepContainer";

const StepSection = () => {
    const {numberStep} = useParams()
    const {projectPath} = useParams()
    const {data: currentProject, isLoading} = useGetDetailsQuery(projectPath, {refetchOnMountOrArgChange: true})


    return (
        <div>
            <Drawer
                variant={'permanent'}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'}
                }}
            >
                <StepMenu currentProject={currentProject}/>
            </Drawer>
            {isLoading ? <Skeleton/> : <StepBC currentProject={currentProject}/>}
            {isLoading ? <Skeleton count={20}/> : <StepContainer/>}
        </div>
    );
};

export default StepSection;