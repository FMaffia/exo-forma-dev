import React from 'react'
import Img from '../img/error404.png'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <img src={Img} height={256} alt={''} />
            <h4>Attenzione pagina non trovata</h4>
            <Button color={'primary'} onClick={() => navigate({ to: '/progetti' })}>
                Torna indietro
            </Button>
        </Container>
    )
}

export default Page404
