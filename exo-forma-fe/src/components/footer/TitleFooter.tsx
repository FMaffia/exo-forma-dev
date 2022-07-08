import React from 'react'
import { Box, Typography } from '@mui/material'
import { TypographyHeader, TypographyHeaderPre } from '../header/Title'

const TitleFooter = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
                <TypographyHeaderPre>EXO</TypographyHeaderPre>
                <TypographyHeader>FORMA</TypographyHeader>
            </Box>
            <Box>
                <Typography variant="body1" color={'white'}>
                    Exolab - Progetto di formazione interna 2022
                </Typography>
            </Box>
        </Box>
    )
}

export default TitleFooter
