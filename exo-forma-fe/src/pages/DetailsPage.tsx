import React from 'react'
import { Avatar, Box, Fade, Paper } from '@mui/material'
import { Outlet, useMatch } from '@tanstack/react-location'
import ButtonBarDetails from '../components/buttons/ButtonBarDetails'
import HeaderDetail from '../components/details/HeaderDetail'
import { END_POINT_LOAD_IMAGE } from '../services/endpoint/URI_RESOURCES'
import { useGetDetailsQuery } from '../api/projectsApi'

const DetailsPage = () => {
    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath)

    return (
        <Fade timeout={1000} in={true} unmountOnExit>
            <Box sx={{ width: '100%', mt: 1 }}>
                <Paper sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)' }}>
                        {currentProject && (
                            <Avatar
                                alt={currentProject.title}
                                variant="square"
                                src={END_POINT_LOAD_IMAGE + '?id=' + currentProject.id + '.jpg'}
                                sx={{ width: '20rem', height: 'inherit' }}
                            />
                        )}
                        <HeaderDetail currentProject={currentProject} />
                    </Box>
                </Paper>
                <Outlet />
                <ButtonBarDetails started={currentProject?.lastStep !== 0} />
            </Box>
        </Fade>
    )
}

export default DetailsPage
