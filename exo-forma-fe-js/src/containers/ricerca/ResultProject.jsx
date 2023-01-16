import React from 'react'
import CardProject from '../../components/ricerca/CardProject'
import { Col, Row } from 'react-bootstrap'
import EmptyResult from './EmptyResult'

const ResultProject = ({ projects }) => {
    return (
        <Row className="mb-4 h-100">
            {projects?.length > 0 ? (
                projects.map(fp => (
                    <Col key={fp.id} xs={12} sm={6} lg={4} xl={3}>
                        <CardProject project={fp} />
                    </Col>
                ))
            ) : (
                <EmptyResult />
            )}
        </Row>
    )
}

export default ResultProject
