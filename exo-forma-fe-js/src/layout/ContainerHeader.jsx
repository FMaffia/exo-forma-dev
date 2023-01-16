import React from 'react'
import betaLogoWhite from '../img/tools.png'
import { Col, Row } from 'react-bootstrap'
import clsx from 'clsx'

const ContainerHeader = ({ footer }) => {
    return (
        <nav className={clsx(footer ? 'bg-gradient-custom-inverted' : 'bg-gradient-custom', 'navbar navbar-expand-lg text-white ')}>
            <div className="container-fluid py-2">
                <Row className="w-100">
                    <Col className="text-center" sm={2} md={2}>
                        <img src={betaLogoWhite} className="logo" alt="" />
                    </Col>
                    <Col sm={10} md={10}>
                        <h1>
                            EXO<span className="text-info">FORMA</span>
                        </h1>
                        <p>Repository di progetti utili allo sviluppo e all'apprendimento durante il periodo di stage</p>
                    </Col>
                </Row>
            </div>
        </nav>
    )
}

export default ContainerHeader
