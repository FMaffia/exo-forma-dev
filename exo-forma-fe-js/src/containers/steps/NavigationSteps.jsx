import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useUpdateLastStepMutation} from "../../api/projectsUserApi";
import {MobileStepper} from "@mui/material";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Star from '@mui/icons-material/Star'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import ConfirmDialog from "../../ui/ConfirmDialog";

const NavigationSteps = ({setDirection, currentProject, currentStep}) => {
    const {projectPath} = useParams()
    const {numberStep} = useParams()
    const [openDialog, setOpenDialog] = useState(false)
    const [updateLastStep] = useUpdateLastStepMutation()

    const stepsCount = currentProject.stepsCount
    const navigate = useNavigate()

    const goPrevious = () => {
        setDirection('right')
        navigate('/progetti/' + projectPath + '/step/' + (+numberStep - 1))
    }


    const goNext = () => {
        if (+numberStep !== stepsCount) {
            setDirection('left')
            navigate('/progetti/' + projectPath + '/step/' + (+numberStep + 1))
        }
        saveStep()
    }
    const saveStep = () => {
        const requestBody = {
            lastStep: currentProject?.lastStep,
            idProject: currentProject?.id
        }
        updateLastStep(requestBody)
        setOpenDialog(false)
    }
    const confirmAction = () => {
        saveStep()
        goNext()
    }
    return (
        <>
            <MobileStepper
                variant="text"
                steps={stepsCount}
                position="static"
                sx={{backgroundColor: 'white'}}
                activeStep={currentStep ? currentStep.number - 1 : 0}
                nextButton={
                    <Button disabled={currentProject?.lastStep > stepsCount} size="small"
                            onClick={() => setOpenDialog(true)}>
                        {+numberStep === stepsCount ?
                            <Typography sx={{display: "flex"}}> <Star/> Completa </Typography> :
                            <Typography sx={{display: "flex"}}>Avanti <KeyboardArrowRight/></Typography>}

                    </Button>
                }
                backButton={
                    <Button size="small" onClick={() => goPrevious()} disabled={+numberStep === 1}>
                        <Typography sx={{display: "flex"}}><KeyboardArrowLeft/> Indietro </Typography>
                    </Button>
                }
            />
            <ConfirmDialog
                body={
                    +numberStep === stepsCount ? <p>Setti questo progetto a <strong>completato?</strong></p> : <p>
                        Setti questo step a <strong>completato?</strong>
                    </p>
                }
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleConfirm={() => {
                    confirmAction()
                }}
            />
        </>
    )
};

export default NavigationSteps;