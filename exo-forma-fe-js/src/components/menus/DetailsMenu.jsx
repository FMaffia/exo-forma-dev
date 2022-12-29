import React from 'react'
import {Box, Button, Divider, Typography} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import {purple} from '@mui/material/colors'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import ArticleIcon from '@mui/icons-material/Article'
import UserInfo from './UserInfo'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate, useParams} from "react-router-dom";
import ConfirmDialog from "../../ui/ConfirmDialog";
import StepIndicator from "../../containers/dettaglio/StepIndicator";
import {useUpdateLastStepMutation} from "../../api/projectsUserApi";

const DetailsMenu = ({currentProject}) => {
    const [triggerRestart, setTriggerRestart] = React.useState(false)

    const navigate = useNavigate()

    const {projectPath} = useParams()
    const isStarted = currentProject?.lastStep ? currentProject.lastStep > 0 : false
    const [updateLastStep] = useUpdateLastStepMutation()

    const restartAction = () => {
        const requestBody = {
            lastStep: 0,
            idProject: currentProject?.id
        }
        updateLastStep(requestBody)
        navigate('/progetti/' + projectPath + '/step/1')
        setTriggerRestart(false)
    }

    const continueStep = () => {
        if (currentProject?.lastStep > currentProject.stepsCount) {
            navigate('/progetti/' + projectPath + '/step/' + (currentProject.lastStep - 1))
            return
        }
        navigate('/progetti/' + projectPath + '/step/' + (currentProject.lastStep))
    }
    return (
        <>
            <Box sx={{p: 1, alignSelf: 'left'}}>
                <Button id="basic-button" aria-haspopup="true" onClick={() => navigate("/progetti")}>
                    <ArrowBackIcon color={'primary'}/>
                    Indietro
                </Button>
            </Box>
            <UserInfo/>
            <Divider/>
            <Typography sx={{p: 2, fontWeight: 600, pb: 1, display: 'flex', alignItems: 'center'}} variant={'h5'}>
                <ArticleIcon color={'primary'} sx={{mr: 2}}/> {currentProject?.title}
            </Typography>
            {isStarted ? (
                <MenuList>
                    <StepIndicator currentProject={currentProject}/>
                    <Divider/>
                    <MenuItem onClick={() => continueStep(true)}>
                        <ListItemIcon>
                            <PlayCircleFilledWhiteIcon color={'primary'}/>
                        </ListItemIcon>
                        {currentProject?.lastStep > currentProject.stepsCount ?
                            <ListItemText>
                                Rivedi steps
                            </ListItemText> : <ListItemText>
                                Riprendi dallo <span
                                style={{color: purple[800], fontWeight: 'bold'}}> step {currentProject?.lastStep}</span>
                            </ListItemText>
                        }
                    </MenuItem>
                    <MenuItem onClick={() => setTriggerRestart(true)}>
                        <ListItemIcon>
                            <RestartAltRoundedIcon color={'primary'}/>
                        </ListItemIcon>
                        <ListItemText>Ricomincia</ListItemText>
                    </MenuItem>
                </MenuList>
            ) : (
                <MenuList>
                    <MenuItem onClick={() => setTriggerRestart(true)}>
                        <ListItemIcon>
                            <PlayCircleFilledWhiteIcon color={'primary'}/>
                        </ListItemIcon>
                        <ListItemText>Inizia a progettare</ListItemText>
                    </MenuItem>
                </MenuList>
            )}
            <ConfirmDialog
                body={`Sei sicuro di iniziare il progetto ?`}
                open={triggerRestart}
                handleClose={() => setTriggerRestart(false)}
                handleConfirm={() => {
                    restartAction()
                }}
            />

        </>
    )
}

export default DetailsMenu
