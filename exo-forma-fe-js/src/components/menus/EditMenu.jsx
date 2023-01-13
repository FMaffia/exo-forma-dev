import React from 'react'
import UserInfo from './UserInfo'
import Divider from '@mui/material/Divider'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import { purple } from '@mui/material/colors'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PlaylistPlay from '@mui/icons-material/PlaylistPlay'
import AddCircle from '@mui/icons-material/AddCircle'
import { FEATURE_PATH, PROJECT_ROOT_NEW, STEP_FORM_PATH, STEP_FORM_PATH_NEW } from '../../constants/Routes'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { useSelector } from 'react-redux'

export const emptyArray = []
const EditMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const steps = useSelector(state => state.currentProject.steps) || emptyArray

    const navigateStep = stepNumber => {
        navigate(STEP_FORM_PATH + stepNumber)
    }
    return (
        <div>
            <Box sx={{ p: 1, alignSelf: 'left' }}>
                <Button id="basic-button" aria-haspopup="true" onClick={() => navigate('/progetti')}>
                    <ArrowBackIcon color={'primary'} />
                    Indietro
                </Button>
            </Box>
            <UserInfo />
            <Divider />
            <MenuList>
                <Typography sx={{ p: 2, fontWeight: 600 }} variant={'button'} color={'inherit'}>
                    <span style={{ color: purple[600] }}>Informazioni generali</span>
                </Typography>
                <MenuItem selected={location.pathname === PROJECT_ROOT_NEW} onClick={() => navigate(PROJECT_ROOT_NEW)}>
                    <ListItemIcon>
                        <AppRegistrationIcon color={'primary'} />
                    </ListItemIcon>
                    <ListItemText>Descrizione</ListItemText>
                </MenuItem>
                <MenuItem selected={location.pathname === FEATURE_PATH} onClick={() => navigate(FEATURE_PATH)}>
                    <ListItemIcon>
                        <LocalFireDepartmentIcon color={'primary'} />
                    </ListItemIcon>
                    <ListItemText>Caratteristiche</ListItemText>
                </MenuItem>
                <MenuItem selected={location.pathname === STEP_FORM_PATH_NEW} onClick={() => navigate(STEP_FORM_PATH_NEW)}>
                    <ListItemIcon>
                        <AddCircle color={'primary'} />
                    </ListItemIcon>
                    <ListItemText>Aggiungi step</ListItemText>
                </MenuItem>
                {steps?.length > 0 && (
                    <Typography sx={{ p: 2, fontWeight: 600 }} variant={'button'} color={'inherit'}>
                        <span style={{ color: purple[600] }}>Steps</span>
                    </Typography>
                )}
                {steps?.map(step => (
                    <ListItem selected={location.pathname === STEP_FORM_PATH + step.number} key={step.number} disablePadding>
                        <ListItemButton onClick={() => navigateStep(step.number)}>
                            <ListItemIcon>
                                <PlaylistPlay />
                            </ListItemIcon>
                            <ListItemText primary={`Step ${step.number}`} secondary={step.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </MenuList>
        </div>
    )
}

export default EditMenu
