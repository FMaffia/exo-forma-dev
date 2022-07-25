import React from 'react'
import { Project } from '../../types/models'
import { Box, Grid } from '@mui/material'
import CardProject from '../../components/ricerca/CardProject'
import { useGetProjectsQuery } from '../../api/projectsApi'
import { cloneDeep } from 'lodash'
/*{ refetchOnMountOrArgChange: true }*/
const RisultatiRicerca = () => {
    const { data, isLoading } = useGetProjectsQuery('', { refetchOnMountOrArgChange: true })
    const filteredProjects: Project[] | undefined = cloneDeep(data)
    return (
        <Box
            sx={{
                position: 'relative'
            }}
        >
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'left' }}>
                {!isLoading &&
                    filteredProjects?.map(fp => (
                        <Grid key={fp.id} item xs={12} sm={6} md={4} lg={3} xl={4}>
                            <CardProject project={fp} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
}

export default RisultatiRicerca
