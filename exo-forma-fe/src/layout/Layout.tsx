import React from 'react'
import { Box, Container, createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material'
import { grey, lime, purple } from '@mui/material/colors'
import { Title } from '../components/header/Title'
import { Outlet, Router } from '@tanstack/react-location'
import DrawnerLaterale, { drawerWidth } from './DrawnerLaterale'
import { location, menuRoutes, privateRoutes } from '../utility/RoutesMap'

export const theme = createTheme({
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

const ContainerHeader = styled(Container)(({ theme }) => ({
    '@media all': {
        minHeight: 100,
        display: 'flex',
        padding: '1rem',
        background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)',
        borderBottom: `5px ${theme.palette.secondary.light} solid`,
        marginLeft: drawerWidth
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
        borderTop: `5px ${theme.palette.secondary.light} solid`,
        marginLeft: drawerWidth
    }
}))

export const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
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
