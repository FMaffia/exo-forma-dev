import React, { useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { useGetDetailsQuery, useGetStepByNumberQuery, useGetStepsByIdQuery } from '../../api/projectsApi'
import ConfirmDialog from '../misc/ConfirmDialog'
import { useUpdateLastStepMutation } from '../../api/projectsUsersApi'
import { ProjectUser } from '../../types/models'

interface Props {
    setDirection: any;
}

const PaginationSteps = ({ setDirection }: Props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const {
        params: { numberStep }
    } = useMatch()
    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: step, isLoading } = useGetStepByNumberQuery({ idProject: currentProject?.id, number: +numberStep })
    const [updateLastStep] = useUpdateLastStepMutation()

    const stepsCount = currentProject ? currentProject.stepsCount : 0
    const navigate = useNavigate()

    const goPrevious = () => {
        setDirection('right')
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + (+numberStep - 1) })
    }

    const checkGoNext = () => {
        if (+numberStep === currentProject?.lastStep) {
            setOpenDialog(true)
            return
        } else goNext()
    }

    const goNext = () => {
        setDirection('left')
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + (+numberStep + 1) })
        setOpenDialog(false)
    }
    const confirmAction = () => {
        const requestBody: ProjectUser = {
            lastStep: currentProject?.lastStep,
            idProject: currentProject?.id
        }
        updateLastStep(requestBody)
        goNext()
    }
    return (
        <>
            <MobileStepper
                variant="text"
                steps={stepsCount}
                position="static"
                sx={{ backgroundColor: 'white' }}
                activeStep={step ? step.number - 1 : 0}
                nextButton={
                    <Button size="small" onClick={() => checkGoNext()} disabled={+numberStep === stepsCount}>
                        Avanti
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={() => goPrevious()} disabled={+numberStep === 1}>
                        <KeyboardArrowLeft /> Indietro
                    </Button>
                }
            />
            <ConfirmDialog
                body={
                    <p>
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
}

export default PaginationSteps
