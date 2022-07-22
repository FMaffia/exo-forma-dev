import React, { useEffect } from 'react'
import { Backdrop, Box, CircularProgress, Container, createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material'
import { grey, lime, purple } from '@mui/material/colors'
import { Title } from '../components/header/Title'
import { Outlet, ReactLocation, Router } from '@tanstack/react-location'
import { useCheckUserMutation } from '../api/userApi'
import { User } from '../types/models'
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react'
import DrawnerLaterale from './DrawnerLaterale'
import { menuRoutes, privateRoutes, publicRoutes } from '../utility/RoutesMap'
import DynamicBreadCrumb from '../utility/DynamicBreadCrumb'

const theme = createTheme({
    typography: {
        fontFamily: 'Anek Latin!important',
        h6: {
            fontWeight: 'bold',
            color: grey['800']
        }
    },
    palette: {
        background: {
            default: '#E9EEF1'
        },
        primary: {
            main: purple['800'],
            light: purple['900'],
            dark: purple['900']
        },
        secondary: {
            main: lime.A400,
            light: lime.A400,
            dark: '#90cc00'
        }
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        borderLeft: `5px solid ${purple['800']}`
                    }
                }
            }
        }
    }
})

const location = new ReactLocation()
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

export const datiLogin: User = {
    email: 'edo.galizia@exolab.it',
    pass: '12345'
}
export const Layout = () => {
    const [checkUser, { status }] = useCheckUserMutation({ fixedCacheKey: 'userKey' })
    const isLoading = status !== QueryStatus.fulfilled

    useEffect(() => {
        checkUser(datiLogin)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={() => null}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ContainerHeader maxWidth={false}>
                <Title footer={false} />
            </ContainerHeader>
            <Box sx={{ display: 'flex' }}>
                <Router location={location} routes={menuRoutes}>
                    <DrawnerLaterale />
                </Router>
                <ContainerMain maxWidth={false}>
                    <CssBaseline />
                    <Router location={location} routes={privateRoutes}>
                        <DynamicBreadCrumb />
                        <Outlet />
                    </Router>
                </ContainerMain>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true} />
            </ContainerFooter>
        </ThemeProvider>
    )
}

export const NoLayout = () => {
    const location = new ReactLocation()
    return (
        <ThemeProvider theme={theme}>
            <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={false} onClick={() => null}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ContainerHeader maxWidth={false}>
                <Title footer={false} />
            </ContainerHeader>
            <Box sx={{ display: 'flex' }}>
                <ContainerMain maxWidth={false}>
                    <Router location={location} routes={publicRoutes}>
                        <Outlet />
                    </Router>
                </ContainerMain>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true} />
            </ContainerFooter>
        </ThemeProvider>
    )
}
