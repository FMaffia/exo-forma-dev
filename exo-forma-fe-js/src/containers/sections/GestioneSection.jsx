import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BaseBreadcrumb from '../../components/breadcrumbs/BaseBreadcrumb'
import Skeleton from 'react-loading-skeleton'
import ResultProject from '../ricerca/ResultProject'
import { useGetProjectsQuery } from '../../api/projectsApi'
import GestioneMenu from '../../components/menus/GestioneMenu'
import Container from 'react-bootstrap/Container'

const GestioneSection = () => {
    const { data, isLoading } = useGetProjectsQuery({ refetchOnMountOrArgChange: true })

    return (
        <Container fluid={true} className={'p-3'}>
            <Row>
                <Col className="" sm={12}>
                    <BaseBreadcrumb />
                </Col>
                <Col sm={12} lg={2}>
                    <GestioneMenu />
                </Col>
                <Col sm={12} lg={10}>
                    {isLoading ? <Skeleton count={20} /> : <ResultProject projects={data} />}
                </Col>
            </Row>
        </Container>
    )
}

export default GestioneSection
