import React from 'react'
import { Box, Container } from '@mui/material'
import ContainerHeader from './ContainerHeader'

const PublicLayout = ({ children }) => {
    return (
        <>
            <ContainerHeader footer={false} />
            <Box>
                <Container sx={{ display: 'flex', height: '80vh' }} maxWidth={false}>
                    {children}
                </Container>
            </Box>
            <ContainerHeader footer={true} />
        </>
    )
}

export default PublicLayout
