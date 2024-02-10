import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECT_ROOT } from '../../constants/Routes'
import { useUpdateMutation } from '../../api/projectsApi'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'

const ButtonBarEdit = () => {
    const navigate = useNavigate()
    const reduxProject = useSelector(state => state.currentProject)
    const [update, { isLoading }] = useUpdateMutation()

    const saveAs = () => {
        update(reduxProject)
    }

    return (
        <Row className={'justify-content-lg-between'}>
            <Col>
                <Button size="large" onClick={() => navigate(PROJECT_ROOT)}>
                    Indietro
                </Button>
            </Col>
            <Col>
                <Button size="large" onClick={() => saveAs()}>
                    Salva
                </Button>
            </Col>
        </Row>
    )
}

export default ButtonBarEdit;
