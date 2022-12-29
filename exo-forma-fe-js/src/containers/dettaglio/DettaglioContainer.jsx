import React from 'react';
import {Avatar, Box, Button, Fade, Paper, Stack} from "@mui/material";
import {END_POINT_LOAD_IMAGE} from "../../api/URI";
import HeaderDetail from "./HeaderDetail";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";
import BodyDetail from "./BodyDetail";

const DettaglioContainer = ({currentProject}) => {
    const navigate = useNavigate()

    return (
        <Fade timeout={1000} in={true} unmountOnExit>
            <Box sx={{width: '100%', mt: 1}}>
                <Paper sx={{mb: 2}}>
                    <Box sx={{
                        display: 'flex',
                        background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)'
                    }}>
                        {currentProject && (
                            <Avatar
                                alt={currentProject.title}
                                variant="square"
                                src={END_POINT_LOAD_IMAGE + '?id=' + currentProject.id + '.jpg'}
                                sx={{width: '20rem', height: 'inherit'}}
                            />
                        )}
                        <HeaderDetail currentProject={currentProject}/>
                    </Box>
                </Paper>
                <BodyDetail currentProject={currentProject}/>
                <Stack direction="row" spacing={2} sx={{mt: 4, mb: 2}}>
                    <div>
                        <Button size="large" startIcon={<ArrowBackIosIcon/>} variant="outlined"
                                onClick={() => navigate(-1)}>
                            Indietro
                        </Button>
                    </div>
                </Stack>
            </Box>
        </Fade>
    );
};

export default DettaglioContainer;