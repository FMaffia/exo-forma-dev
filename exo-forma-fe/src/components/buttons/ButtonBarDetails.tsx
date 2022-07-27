import React from 'react'
import { Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useLocation, useMatch, useNavigate } from '@tanstack/react-location'
import { useGetDetailsQuery } from '../../api/projectsApi'
import ConfirmDialog from '../misc/ConfirmDialog'
import { includes } from 'lodash'

interface ButtonProps {
    started: boolean;
}

const ButtonBarDetails = ({ started }: ButtonProps) => {
    const {
        params: { projectPath }
    } = useMatch()
    const [triggerRestart, setTriggerRestart] = React.useState(false)
    const [triggerContinue, setTriggerContinue] = React.useState(false)
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath)
    const navigate = useNavigate()
    const location = useLocation()
    const isStep = includes(location.current.pathname, 'step')

    const restartAction = () => {
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/1' })
        setTriggerRestart(false)
    }
    const continueAction = () => {
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + currentProject?.lastStep })
        setTriggerContinue(false)
    }

    return (
        <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 2 }}>
            <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => navigate({ to: '/progetti' })}>
                Indietro
            </Button>
            {isStep || (
                <>
                    <Button variant="contained" size="large" startIcon={<PlayCircleFilledIcon />} onClick={() => setTriggerRestart(true)}>
                        Inizia
                    </Button>
                    {started && (
                        <Button variant="contained" size="large" startIcon={<RestartAltIcon />} onClick={() => setTriggerContinue(true)}>
                            Riprendi
                        </Button>
                    )}
                </>
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
        </Stack>
    )
}

export default ButtonBarDetails
