import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateLastStepMutation } from '../../api/projectsUserApi'
import { Button } from 'react-bootstrap'
import ConfirmDialog from '../../ui/ConfirmDialog'

const NavigationSteps = ({ setDirection, currentProject, currentStep }) => {
    const { projectPath } = useParams()
    const { numberStep } = useParams()
    const [openDialog, setOpenDialog] = useState(false)
    const [updateLastStep] = useUpdateLastStepMutation()
    const stepsCount = currentProject.stepsCount
    const navigate = useNavigate()
    const isLastStep = +numberStep === stepsCount

    const goPrevious = () => {
        setDirection('right')
        navigate('/progetti/' + projectPath + '/step/' + (+numberStep - 1))
    }
    const checkGoNext = () => {
        if (!currentStep.completed) {
            setOpenDialog(true)
            return
        }
        goNext()
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
        <div className="d-flex flex-row justify-content-center">
            <Button className="me-2" onClick={() => goPrevious()} disabled={+numberStep === 1}>
                Indietro
            </Button>
            <Button variant={isLastStep ? 'info' : 'primary'} disabled={currentProject?.lastStep > stepsCount} size="small" onClick={checkGoNext}>
                {isLastStep ? <span>Completa</span> : <span>Avanti</span>}
            </Button>
            <ConfirmDialog
                body={
                    +numberStep === stepsCount ? (
                        <p>
                            Setti questo progetto a <strong>completato?</strong>
                        </p>
                    ) : (
                        <p>
                            Setti questo step a <strong>completato?</strong>
                        </p>
                    )
                }
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleConfirm={() => {
                    confirmAction()
                }}
            />
        </div>
    )
}
export default NavigationSteps
