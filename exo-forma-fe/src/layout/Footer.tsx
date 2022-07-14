import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

function Copyright() {
    return (
        <>
            <Typography variant="body2" color="white">
                EXOLAB ~ Progetto di formazione interna {new Date().getFullYear()}
            </Typography>
        </>
    )
}

export default function StickyFooter() {
    const footer = {
        position: 'fixed',
        width: '100wh',
        margin: 0,
        background: 'linear-gradient(0deg, rgba(70,0,112,1) 0%, rgba(78,25,143,1) 100%)',
        alignItems: 'center'
    }
    return (
        <Box component="div" sx={footer}>
            <Typography variant="h3" noWrap color="secondary" component="span">
                EXO
            </Typography>
            <Typography variant="h3" noWrap color="white" component="span">
                FORMA
            </Typography>
            <Copyright />
        </Box>
    )
}
