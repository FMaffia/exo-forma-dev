import React, { useEffect, useState } from 'react'
import BaseBreadcrumb from '../../components/breadcrumbs/BaseBreadcrumb'
import Skeleton from 'react-loading-skeleton'
import ResultProject from '../ricerca/ResultProject'
import { useGetProjectsQuery } from '../../api/projectsApi'
import { MenuFilter } from '../../models/menuItems'
import HomeMenu from '../../components/menus/HomeMenu'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import FiltriRicerca from '../ricerca/FiltriRicerca'
import { keyCloak } from '../../constants/Constants'

const ProgettiSection = () => {
    const filter = useSelector(state => state.ui.filterProject)
    const { data, isLoading } = useGetProjectsQuery({ refetchOnMountOrArgChange: true })
    const [filteredProjects, setFilteredProjects] = useState(data)
    const token = keyCloak.token

    useEffect(() => {
        filtra()
    }, [filter, data])

    const filtra = () => {
        if (filter === MenuFilter.COMPLETATI) {
            let x = data?.filter(p => p.lastStep > p.stepsCount)
            setFilteredProjects(x)
            return
        }
        if (filter === MenuFilter.IN_CORSO) {
            let y = data?.filter(p => p.lastStep > 0 && p.lastStep < p.stepsCount)
            setFilteredProjects(y)
            return
        }
        setFilteredProjects(data)
    }
    return (
        <Container fluid={true} className={'p-3'}>
            <Row>
                <Col className="" sm={12}>
                    <BaseBreadcrumb />
                </Col>
                <Col sm={12} lg={2} xl={2}>
                    <HomeMenu />
                </Col>
                <Col sm={12} lg={10} xl={10}>
                    <button onClick={() => navigator.clipboard.writeText(token)}>Copy token</button>
                    <FiltriRicerca />
                    {isLoading ? <Skeleton count={20} /> : <ResultProject projects={filteredProjects} />}
                </Col>
            </Row>
        </Container>
    )
}

export default ProgettiSection
