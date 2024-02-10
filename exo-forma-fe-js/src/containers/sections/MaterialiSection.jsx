import React from 'react'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'
import BaseBreadcrumb from '../../components/breadcrumbs/BaseBreadcrumb'
import FiltriRicerca from '../ricerca/FiltriRicerca'
import MaterialiMenu from '../../components/menus/MaterialiMenu'

const MaterialiSection = () => {
    return (
        <Container fluid={true} className={'p-3'}>
            <Row>
                <Col className="" sm={12}>
                    <BaseBreadcrumb />
                </Col>
                <Col sm={12} lg={2} xl={2}>
                    <MaterialiMenu />
                </Col>
                <Col sm={12} lg={10} xl={10}>
                    <FiltriRicerca />
                </Col>
            </Row>
        </Container>
    )
}

export default MaterialiSection
