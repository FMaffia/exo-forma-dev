import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, styled } from '@mui/material'

interface Props {
    small?: boolean;
}

export const TypographyHeader = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontFamily: 'Saira Stencil One!important',
    fontSize: '3rem',
    opacity: 0.5
}))
export const TypographyHeaderPre = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontFamily: 'Saira Stencil One!important',
    fontSize: '3rem',
    opacity: 0.7
}))

const Title = ({ small }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex' }}>
                <TypographyHeaderPre variant={small ? 'h5' : 'body1'} noWrap color="secondary">
                    EXO
                </TypographyHeaderPre>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <TypographyHeader variant={small ? 'h5' : 'body1'} noWrap color="white">
                    FORMA
                </TypographyHeader>
            </Box>
        </Box>
    )
}

export default Title
