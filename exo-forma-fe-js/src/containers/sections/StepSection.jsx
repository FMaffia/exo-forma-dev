import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetDetailsQuery } from '../../api/projectsApi'
import Skeleton from 'react-loading-skeleton'
import StepBC from '../../components/breadcrumbs/StepBC'
import StepContainer from '../steps/StepContainer'
import { Col, Row } from 'react-bootstrap'
import StepMenu from '../../components/menus/StepMenu'

const StepSection = () => {
    const { projectPath } = useParams()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath, { refetchOnMountOrArgChange: true })

    return (
        <Row style={{ minHeight: '80vh' }}>
            <Col sm={12} lg={2} className="pt-3 pt-0">
                <StepMenu currentProject={currentProject} />
            </Col>
            <Col className="p-md-4" sm={12} lg={10}>
                {isLoading ? (
                    <Skeleton count={20} />
                ) : (
                    <>
                        <StepBC currentProject={currentProject} />
                        <StepContainer currentProject={currentProject} />
                    </>
                )}
            </Col>
        </Row>
    )
}

export default StepSection
