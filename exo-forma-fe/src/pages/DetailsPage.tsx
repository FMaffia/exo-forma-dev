import React from 'react'
import { Avatar, Box, Button, Fade, Paper, Stack } from '@mui/material'
import { Outlet, useLocation, useMatch, useNavigate } from '@tanstack/react-location'
import HeaderDetail from '../components/details/HeaderDetail'
import { END_POINT_LOAD_IMAGE } from '../services/endpoint/URI_RESOURCES'
import { useGetDetailsQuery } from '../api/projectsApi'
import { includes } from 'lodash'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import HomeIcon from '@mui/icons-material/Home'

const DetailsPage = () => {
    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath, { refetchOnMountOrArgChange: true })
    const location = useLocation()
    const navigate = useNavigate()
    const isStep = includes(location.current.pathname, 'step')

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
                <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 2 }}>
                    <div>
                        <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => navigate({ to: '/progetti' })}>
                            Indietro
                        </Button>
                    </div>
                </Stack>
            </Box>
        </Fade>
    )
}

export default DetailsPage
