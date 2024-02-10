import React from 'react'
import Form from 'react-bootstrap/Form'
import { Accordion } from 'react-bootstrap'

const FiltriRicerca = () => {
    return (
        <Accordion className={'mb-4'} defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtra</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default FiltriRicerca