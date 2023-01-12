import React from 'react'
import { Box } from '@mui/material'
import ButtonBardEdit from './ButtonBardEdit'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'

const NewEditContainer = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={8} xl={6}>
                <Box sx={{ minHeight: '50vh' }}>
                    <Outlet />
                </Box>
                <ButtonBardEdit />
            </Grid>
        </Grid>
    )
}

export default NewEditContainer