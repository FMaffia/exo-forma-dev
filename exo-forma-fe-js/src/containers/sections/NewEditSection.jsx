import React, { useEffect } from 'react'
import NewEditContainer from '../newedit/NewEditContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectByIdQuery } from '../../api/projectsApi'
import { resetBackupProject } from '../../slices/backupProjectSlice'
import { resetSelectedProject } from '../../slices/projectSlice'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Button, Col, Row } from 'react-bootstrap'
import BaseBreadcrumb from '../../components/breadcrumbs/BaseBreadcrumb'
import Skeleton from 'react-loading-skeleton'
import EditMenu from '../../components/menus/EditMenu'

const NewEditSection = () => {
    const reduxProject = useSelector(state => state.currentProject)
    const { data: currentProject, isLoading } = useGetProjectByIdQuery({ id: reduxProject.id, refetchOnMountOrArgChange: true })
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch([resetBackupProject(), resetSelectedProject()])
    }, [])

    const publicProject = () => {
        console.log('public')
    }

    return (
        <Container fluid={true} className={'p-3'}>
            <Row className={''}>
                <Col className="" sm={12}>
                    <BaseBreadcrumb />
                </Col>
                <Col sm={12} lg={2} xl={2}>
                    <EditMenu />
                </Col>
                <Col className="p-md-4" sm={12} lg={10}>
                    {isLoading ? (
                        <Skeleton count={20} />
                    ) : (
                        <Container className="mb-2">
                            <Card className="p-3 bg-primary">
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <h1 className="mb-0 text-white">{reduxProject?.title || 'Nuovo progetto'}</h1>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <Button onClick={() => publicProject()}>Pubblica</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <NewEditContainer />
                        </Container>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default NewEditSection
