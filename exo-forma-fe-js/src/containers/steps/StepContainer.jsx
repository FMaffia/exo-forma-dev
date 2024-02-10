import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetDetailsQuery, useGetStepByNumberQuery } from '../../api/projectsApi'
import Card from 'react-bootstrap/Card'
import NavigationSteps from './NavigationSteps'
import PreviewStep from '../newedit/PreviewStep'

const StepContainer = () => {
    const { numberStep } = useParams()
    const { projectPath } = useParams()

    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: currentStep } = useGetStepByNumberQuery({ idProject: currentProject?.id, number: +numberStep })
    const containerRef = React.useRef(null)
    const [direction, setDirection] = useState('left')

    return (
        <Card className="mt-md-4">
            <Card.Header className="text-primary">
                <h3 className="mb-0">Step {numberStep}</h3>
            </Card.Header>
            <Card.Body>
                <h2> {currentStep?.title}</h2>
                <PreviewStep step={currentStep} />
            </Card.Body>
            <Card.Footer>
                <NavigationSteps setDirection={setDirection} currentStep={currentStep} currentProject={currentProject} />
            </Card.Footer>
        </Card>
    )
}

export default StepContainer
