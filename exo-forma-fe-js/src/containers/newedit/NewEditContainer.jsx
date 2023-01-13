import React from 'react'
import ButtonBarEdit from './ButtonBarEdit'
import { Outlet, useLocation } from 'react-router-dom'
import { includes } from 'lodash'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const NewEditContainer = () => {
    const location = useLocation()
    return (
        <Container className="mb-2">
            <Card className="p-3">
                <Card.Body>
                    <Outlet />
                    {!includes(location.pathname, 'step') && <ButtonBarEdit />}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default NewEditContainer
