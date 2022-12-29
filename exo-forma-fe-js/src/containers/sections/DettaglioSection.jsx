import React from 'react';
import {useParams} from "react-router-dom";
import {useGetDetailsQuery} from "../../api/projectsApi";
import Drawer from "@mui/material/Drawer";
import {drawerWidth} from "../../components/mui/theme";
import Skeleton from "react-loading-skeleton";
import DettaglioContainer from "../dettaglio/DettaglioContainer";
import DetailBC from "../../components/breadcrumbs/DetailBC";
import DetailsMenu from "../../components/menus/DetailsMenu";


const DettaglioSection = () => {
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
                <DetailsMenu currentProject={currentProject}/>
            </Drawer>
            {isLoading ? <Skeleton/> : <DetailBC currentProject={currentProject}/>}
            {isLoading ? <Skeleton count={20}/> : <DettaglioContainer currentProject={currentProject}/>}
        </div>
    );
};

export default DettaglioSection;