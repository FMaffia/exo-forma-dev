import React from 'react'
import { useGetDetailsQuery } from '../../api/projectsApi'
import Skeleton from 'react-loading-skeleton'
import DettaglioContainer from '../dettaglio/DettaglioContainer'
import DetailBC from '../../components/breadcrumbs/DetailBC'
import { Col, Row } from 'react-bootstrap'
import DetailsMenu from '../../components/menus/DetailsMenu'
import { useParams } from 'react-router-dom'

const DettaglioSection = () => {
    const { projectPath } = useParams()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath, { refetchOnMountOrArgChange: true })

    return (
        <Row style={{ minHeight: '80vh' }}>
            <Col sm={12} lg={2} xl={2} className="pt-3 pt-0">
                <DetailsMenu currentProject={currentProject} />
            </Col>
            <Col className="p-md-4" sm={12} lg={10} xl={10}>
                {isLoading ? (
                    <Skeleton count={20} />
                ) : (
                    <>
                        <DetailBC currentProject={currentProject} />

                        <DettaglioContainer currentProject={currentProject} />
                    </>
                )}
            </Col>
        </Row>
    )
}

export default DettaglioSection
