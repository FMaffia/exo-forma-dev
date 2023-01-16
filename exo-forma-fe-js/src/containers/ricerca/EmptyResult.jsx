import React from 'react'
import { Container } from 'react-bootstrap'
import emptySrc from '../../img/empty.png'

const EmptyResult = () => {
    return (
        <Container fluid className="align-items-center d-flex flex-md-column justify-content-center">
            <img src={emptySrc} style={{ width: '4.5rem', opacity: 0.2 }} alt={''} />
            <p className="text-muted">Non ci sono elementi</p>
        </Container>
    )
}

export default EmptyResult
