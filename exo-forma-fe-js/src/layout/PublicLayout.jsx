import React from 'react'
import ContainerHeader from './ContainerHeader'
import Container from 'react-bootstrap/Container'

const PublicLayout = ({ children }) => {
    return (
        <>
            <ContainerHeader footer={false} />
            <Container>
                <Container sx={{ display: 'flex', height: '80vh' }} maxWidth={false}>
                    {children}
                </Container>
            </Container>
            <ContainerHeader footer={true} />
        </>
    )
}

export default PublicLayout
