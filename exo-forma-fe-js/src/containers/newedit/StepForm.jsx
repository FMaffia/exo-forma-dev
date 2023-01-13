import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, FloatingLabel, Row, Spinner } from 'react-bootstrap'
import ButtonBarStepEdit from './ButtonBarStepEdit'
import Form from 'react-bootstrap/Form'
import { useUpdateStepMutation } from '../../api/projectsApi'

const StepForm = () => {
    const steps = useSelector(state => state.currentProject?.steps)
    const { stepEdit } = useParams()
    const [step, setStep] = useState()
    const [updateStep, { isLoading }] = useUpdateStepMutation({ fixedCacheKey: 'update-step' })

    const generateNumberStep = () => {
        return steps.length > 0 ? steps.length + 1 : 1
    }
    const resetStep = () => {
        setStep({ number: generateNumberStep(), title: '', desc: '' })
    }

    useEffect(() => {
        if (stepEdit !== 'new') {
            let current = steps.find(s => s.number === +stepEdit)
            setStep(current)
            return
        }
        resetStep()
    }, [stepEdit, steps])
    return (
        <Row className="flex-column align-items-center">
            {isLoading ? (
                <Col className="col-12 text-center">
                    <Spinner animation="border" variant="info" />
                </Col>
            ) : (
                <Col>
                    <Row>
                        <Col sm={12} md={4} lg={3} className="col-2 text-center">
                            <h1 className="text-primary">{'Step ' + step?.number}</h1>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingTitolo" label="Titolo step" className="mb-3">
                                <Form.Control
                                    placeholder="Titolo step"
                                    value={step?.title}
                                    onChange={e => setStep(prevStep => ({ ...prevStep, title: e.target.value }))}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                            <FloatingLabel controlId="floatingTextarea" label="Descrivi step" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Descrivi step"
                                    value={step?.desc}
                                    onChange={e => setStep(prevStep => ({ ...prevStep, desc: e.target.value }))}
                                    style={{ minHeight: '10rem' }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Col>
            )}
            <Row>
                <Col sm={12} md={4} lg={3} className="col-2 text-center">
                    {isLoading || <ButtonBarStepEdit step={step} setStep={resetStep} />}
                </Col>
                <Col></Col>
            </Row>
        </Row>
    )
}

export default StepForm
