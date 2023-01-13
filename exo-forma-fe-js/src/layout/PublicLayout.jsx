import React from 'react'
import { Box, Container, ThemeProvider } from '@mui/material'
import { theme } from '../components/mui/theme'
import { ContainerFooter, ContainerHeader } from '../components/mui/containersMui'
import Title from './Title'

const PublicLayout = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <ContainerHeader maxWidth={false}>
                <Title footer={false} />
            </ContainerHeader>
            <Box>
                <Container sx={{ display: 'flex', height: '80vh' }} maxWidth={false}>
                    {children}
                </Container>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true} />
            </ContainerFooter>
        </ThemeProvider>
    )
}

export default PublicLayout
