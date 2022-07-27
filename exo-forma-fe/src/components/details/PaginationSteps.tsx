import React from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { useGetDetailsQuery, useGetStepByNumberQuery } from '../../api/projectsApi'

interface Props {
    setDirection: any;
}

const PaginationSteps = ({ setDirection }: Props) => {
    const {
        params: { numberStep }
    } = useMatch()
    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: step, isLoading } = useGetStepByNumberQuery({ idProject: currentProject?.id, number: +numberStep })
    const stepsCount = currentProject ? currentProject.stepsCount : 0
    const navigate = useNavigate()

    const goPrevious = () => {
        setDirection('right')
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + (+numberStep - 1) })
    }
    const goNext = () => {
        setDirection('left')
        navigate({ to: '/progetti/dettaglio/' + projectPath + '/step/' + (+numberStep + 1) })
    }
    return (
        <MobileStepper
            variant="text"
            steps={stepsCount}
            position="static"
            sx={{ backgroundColor: 'white' }}
            activeStep={step ? step.number - 1 : 0}
            nextButton={
                <Button size="small" onClick={() => goNext()} disabled={+numberStep === stepsCount}>
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
    )
}

export default PaginationSteps
