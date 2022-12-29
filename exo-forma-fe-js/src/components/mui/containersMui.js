import {Container, styled} from "@mui/material";
import {drawerWidth} from "./theme";

export const ContainerHeader = styled(Container)(({theme}) => ({
    '@media all': {
        minHeight: 100,
        display: 'flex',
        padding: '1rem',
        background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)',
        borderBottom: `5px ${theme.palette.secondary.light} solid`,
        paddingLeft: drawerWidth,
        width: '100vw'

    }
}))
export const ContainerMain = styled(Container)(({theme}) => ({
    '@media all': {
        minHeight: '90vh',
        display: 'flex',
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        flexDirection: 'column',
        backgroundColor: '#E9EEF1',
        width: '100vw',
        paddingLeft: drawerWidth + 30

    }
}))
export const ContainerFooter = styled(Container)(({theme}) => ({
    '@media all': {
        minHeight: 100,
        display: 'flex',
        padding: '1rem',
        background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)',
        borderTop: `5px ${theme.palette.secondary.light} solid`,
        paddingLeft: drawerWidth,
        width: '100vw'
    }
}))