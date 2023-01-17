import React, { useEffect, useState } from 'react'
import ProjectsBC from '../../components/breadcrumbs/ProjectsBC'
import Skeleton from 'react-loading-skeleton'
import ResultProject from '../ricerca/ResultProject'
import { useGetProjectsQuery } from '../../api/projectsApi'
import { MenuFilter } from '../../models/menuItems'
import HomeMenu2 from '../../components/menus/HomeMenu2'
import { Col, Row } from 'react-bootstrap'

const ProgettiSection = () => {
    const [filter, setFilter] = useState()
    const { data, isLoading } = useGetProjectsQuery({ refetchOnMountOrArgChange: true })
    const [filteredProjects, setFilteredProjects] = useState(data)

    useEffect(() => {
        filtra()
    }, [filter, data])

    const filtra = () => {
        if (filter === MenuFilter.COMPLETATI) {
            let x = data.filter(p => p.lastStep > p.stepsCount)
            setFilteredProjects(x)
            return
        }
        if (filter === MenuFilter.IN_CORSO) {
            let y = data.filter(p => p.lastStep > 0 && p.lastStep < p.stepsCount)
            setFilteredProjects(y)
            return
        }
        setFilteredProjects(data)
    }
    return (
        <Row style={{ minHeight: '80vh' }}>
            <Col sm={12} lg={2} xl={1} className="pt-3 pt-0">
                <HomeMenu2 filter={filter} setFilter={setFilter} />
            </Col>
            <Col className="p-md-4" sm={12} lg={10} xl={11}>
                <ProjectsBC filter={filter} setFilter={setFilter} />
                {isLoading ? <Skeleton count={20} /> : <ResultProject projects={filteredProjects} />}
            </Col>
        </Row>
    )
}

export default ProgettiSection
