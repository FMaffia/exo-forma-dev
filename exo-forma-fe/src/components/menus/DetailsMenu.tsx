import React from 'react'
import { Divider, Typography } from '@mui/material'
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

const DetailsMenu = () => {
    const [triggerRestart, setTriggerRestart] = React.useState(false)
    const [triggerContinue, setTriggerContinue] = React.useState(false)

    const navigate = useNavigate()

    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath)
    const notStartedYet = currentProject?.lastStep === 0
    const [updateLastStep] = useUpdateLastStepMutation()

    const restartAction = () => {
        const requestBody: ProjectUser = {
            lastStep: 1,
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
            <Typography sx={{ p: 2, fontWeight: 600, pb: 1, display: 'flex', alignItems: 'center' }} variant={'h5'}>
                <ArticleIcon color={'primary'} sx={{ mr: 2 }} /> {currentProject?.title}
            </Typography>
            {notStartedYet || (
                <MenuList>
                    <StepIndicator currentProject={currentProject} />
                    <Divider />
                    <MenuItem onClick={() => setTriggerRestart(true)}>
                        <ListItemIcon>
                            <RestartAltRoundedIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText>Ricomincia</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => setTriggerContinue(true)}>
                        <ListItemIcon>
                            <PlayCircleFilledWhiteIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText>
                            Riprendi dallo <span style={{ color: purple[800], fontWeight: 'bold' }}> step {currentProject?.lastStep}</span>
                        </ListItemText>
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
                body={`Sei sicuro di voler riprendere dallo step ${currentProject?.lastStep} ?`}
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
