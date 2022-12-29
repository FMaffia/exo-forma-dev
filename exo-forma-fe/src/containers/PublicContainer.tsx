import { Box, Container, styled, ThemeProvider } from '@mui/material'
import { Title } from '../components/header/Title'
import React from 'react'
import { theme } from '../layout/Layout'
import { ChildProps } from '../layout/CustomMui'

const PublicLayout = ({ children }: ChildProps) => {
    const ContainerHeader = styled(Container)(({ theme }) => ({
        '@media all': {
            minHeight: 100,
            display: 'flex',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)',
            borderBottom: `5px ${theme.palette.secondary.light} solid`
        }
    }))
    const ContainerMain = styled(Container)(({ theme }) => ({
        '@media all': {
            minHeight: '90vh',
            display: 'flex',
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            flexDirection: 'column',
            backgroundColor: '#E9EEF1'
        }
    }))
    const ContainerFooter = styled(Container)(({ theme }) => ({
        '@media all': {
            minHeight: 100,
            display: 'flex',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)',
            borderTop: `5px ${theme.palette.secondary.light} solid`
        }
    }))
    return (
        <ThemeProvider theme={theme}>
            <ContainerHeader maxWidth={false}>
                <Title footer={false} />
            </ContainerHeader>
            <Box sx={{ display: 'flex' }}>
                <ContainerMain maxWidth={false}>{children}</ContainerMain>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true} />
            </ContainerFooter>
        </ThemeProvider>
    )
}
export default PublicLayout
