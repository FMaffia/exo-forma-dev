import React from 'react'
import { Box, Breadcrumbs, Button, Divider, IconButton, Typography } from '@mui/material'
import { useMatch, useNavigate } from '@tanstack/react-location'
import ListItemText from '@mui/material/ListItemText'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { purple } from '@mui/material/colors'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import ArticleIcon from '@mui/icons-material/Article'
import StepIndicator from '../details/StepIndicator'
import ConfirmDialog from '../misc/ConfirmDialog'
import { useGetDetailsQuery } from '../../api/projectsApi'
import { useUpdateLastStepMutation } from '../../api/projectsUsersApi'
import { ProjectUser } from '../../types/models'

import UserInfo from './UserInfo'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
const DetailsMenu = () => {
    const [triggerRestart, setTriggerRestart] = React.useState(false)
    const [triggerContinue, setTriggerContinue] = React.useState(false)

    const navigate = useNavigate()

    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath)
    const isStarted = currentProject?.lastStep ? currentProject.lastStep > 0 : false
    const [updateLastStep] = useUpdateLastStepMutation()

    const restartAction = () => {
        const requestBody: ProjectUser = {
            lastStep: 0,
            idProject: currentProject?.id
        }
        updateLastStep(requestBody)
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/1' })
        setTriggerRestart(false)
    }
    const continueAction = () => {
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + currentProject?.lastStep })
        setTriggerContinue(false)
    }
    return (
        <>
            <Box sx={{ p: 1, alignSelf: 'left' }}>
                <Button id="basic-button" aria-haspopup="true" onClick={() => navigate({ to: '/progetti' })}>
                    <ArrowBackIcon color={'primary'} />
                    Indietro
                </Button>
            </Box>
            <UserInfo />
            <Divider />
            <Typography sx={{ p: 2, fontWeight: 600, pb: 1, display: 'flex', alignItems: 'center' }} variant={'h5'}>
                <ArticleIcon color={'primary'} sx={{ mr: 2 }} /> {currentProject?.title}
            </Typography>
            {isStarted ? (
                <MenuList>
                    <StepIndicator currentProject={currentProject} />
                    <Divider />
                    <MenuItem onClick={() => setTriggerContinue(true)}>
                        <ListItemIcon>
                            <PlayCircleFilledWhiteIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText>
                            Riprendi dallo <span style={{ color: purple[800], fontWeight: 'bold' }}> step {currentProject?.lastStep}</span>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => setTriggerRestart(true)}>
                        <ListItemIcon>
                            <RestartAltRoundedIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText>Ricomincia</ListItemText>
                    </MenuItem>
                </MenuList>
            ) : (
                <MenuList>
                    <MenuItem onClick={() => setTriggerRestart(true)}>
                        <ListItemIcon>
                            <PlayCircleFilledWhiteIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText>Inizia a progettare</ListItemText>
                    </MenuItem>
                </MenuList>
            )}
            <ConfirmDialog
                body={`Sei sicuro di ricominciare il progetto ?`}
                open={triggerRestart}
                handleClose={() => setTriggerRestart(false)}
                handleConfirm={() => {
                    restartAction()
                }}
            />
            <ConfirmDialog
                body={
                    <p>
                        Sei sicuro di voler riprendere dallo<strong> step {currentProject?.lastStep} </strong> ?
                    </p>
                }
                open={triggerContinue}
                handleClose={() => setTriggerContinue(false)}
                handleConfirm={() => {
                    continueAction()
                }}
            />
        </>
    )
}

export default DetailsMenu
