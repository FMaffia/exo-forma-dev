import React, {useEffect} from 'react';
import Drawer from "@mui/material/Drawer";
import {drawerWidth} from "../../components/mui/theme";
import EditMenu from "../../components/menus/EditMenu";
import EditBC from "../../components/breadcrumbs/EditBC";
import NewEditContainer from "../newedit/NewEditContainer";
import {useDispatch, useSelector} from "react-redux";
import {useGetProjectByIdQuery} from "../../api/projectsApi";
import {Backdrop, CircularProgress} from "@mui/material";
import {resetBackupProject} from "../../slices/backupProjectSlice";
import {resetSelectedProject} from "../../slices/projectSlice";

const NewEditSection = () => {
    const reduxProject = useSelector(state => state.currentProject)
    const {data: currentProject, isLoading} = useGetProjectByIdQuery({id: reduxProject.id})
    const dispatch = useDispatch()


    useEffect(() => {
        return () => dispatch([resetBackupProject(), resetSelectedProject()])
    }, [])
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
                <EditMenu/>
            </Drawer>
            <EditBC/>
            <h1>{reduxProject?.title ? "Modifica progetto" : "Nuovo progetto"}</h1>
            {isLoading ? <Backdrop sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}} open={true}
                                   onClick={() => null}>
                    <CircularProgress color="secondary" sx={{mr: 1}}/>
                </Backdrop>
                :
                <NewEditContainer/>
            }
        </div>
    );
};

export default NewEditSection;