import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PROJECT_COMPLETATI, PROJECT_EDIT, PROJECT_IN_CORSO, PROJECT_ROOT_NEW } from '../../constants/Routes'
import Card from 'react-bootstrap/Card'
import { setSelectedProject } from '../../slices/projectSlice'
import { useDispatch } from 'react-redux'
import { Badge, Button, Col, ProgressBar, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons/faFireFlameCurved'
import { range } from 'lodash'
import clsx from 'clsx'
import ImageCard from './ImageCard'

const CardProject = ({ project }) => {
    const maxDifficult = 6
    const navigate = useNavigate()
    const calculatePerc = project?.lastStep ? ((project?.lastStep - 1) * 100) / project?.stepsCount : 0

    const location = useLocation()
    const isModifica = location.pathname === PROJECT_EDIT
    const isInCorso = location.pathname === PROJECT_IN_CORSO
    const isCompletati = location.pathname === PROJECT_COMPLETATI
    const completed = project.lastStep > project.stepsCount
    const dispatch = useDispatch()
    const editProject = project => {
        dispatch(setSelectedProject(project))
        navigate(PROJECT_ROOT_NEW)
    }
    const detailProject = project => {
        dispatch(setSelectedProject(project))
        navigate('/progetti/' + project.path, { relative: 'path' })
    }
    return (
        <Card>
            <ImageCard idProject={project.id} />
            <Card.Body>
                <Card.Title>{project.title} </Card.Title>
                <Card.Text className={'text-muted small mb-0'}>
                    <FontAwesomeIcon className={'text-primary me-2'} icon={faUserCircle} />
                    Creato da: {project.author}
                </Card.Text>
                <Card.Text className={'text-muted small mb-0'}>
                    <FontAwesomeIcon className={'text-primary me-2'} icon={faCalendarDay} />
                    il: {project.creationDate}
                </Card.Text>
                <Card.Text className={'text-muted small'}>
                    Difficoltà:{' '}
                    {range(maxDifficult).map(f => (
                        <FontAwesomeIcon key={f} className={clsx(project.difficult > f ? 'text-primary me-2' : 'text-muted me-2')} icon={faFireFlameCurved} />
                    ))}
                </Card.Text>

                {(isInCorso || isCompletati) && <ProgressBar className="mb-3" variant="primary" now={calculatePerc} label={`${calculatePerc.toFixed(0)}%`} />}
                {project.categories.map(c => (
                    <Badge key={c} bg="primary me-2">{`#${c}`}</Badge>
                ))}
                <hr />
                <Row className="align-content-between">
                    <Col className="text-start">
                        <Button
                            className={clsx(!isModifica && 'stretched-link')}
                            variant={completed ? 'success' : 'primary'}
                            onClick={() => detailProject(project)}
                        >
                            Dettaglio
                        </Button>
                    </Col>
                    {isModifica && (
                        <Col className="text-end">
                            <Button variant="outline-primary" onClick={() => editProject(project)}>
                                Modifica
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardProject
