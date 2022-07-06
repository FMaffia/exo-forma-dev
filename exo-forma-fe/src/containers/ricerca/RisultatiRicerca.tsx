import React from "react";
import {Project} from "../../model/models";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Box, Fab, Grid} from "@mui/material";
import CardProject from "./CardProject";
import AddIcon from '@mui/icons-material/Add';
import {includes} from "lodash";
import {useNavigate} from "react-router-dom";
import {PROJECT_ROOT_NEW} from "../../utility/Routes";
import ConfirmDialog from "../../components/misc/ConfirmDialog";


const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};
const RisultatiRicerca = () => {
    const navigate = useNavigate()
    const filteredProjects: Project[] = useSelector<RootState, Project[]>(
        (state) => state.filteredProjects
    );
    const permissions: string[] = useSelector<RootState, string[]>(
        (state) => state.user.permissions
    );
    const [open, setOpen] = React.useState(false);
    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{display: "flex", justifyContent: "left"}}
            >
                {filteredProjects.map((fp) => (
                    <Grid key={fp.id} item xs={12} sm={6} md={4} lg={3} xl={4}>
                        <CardProject project={fp}/>
                    </Grid>
                ))}
            </Grid>
            {includes(permissions, "WRITE") &&
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => setOpen(true)}>
                <AddIcon/>
            </Fab>
            }
            <ConfirmDialog
                body={<p> Sei sicuro di voler creare un nuovo progetto?</p>}
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={() => navigate(PROJECT_ROOT_NEW)}
            />
        </Box>
    );
};

export default RisultatiRicerca;
