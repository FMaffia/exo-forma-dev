import React from 'react'
import { useGetImageQuery } from '../../api/projectsApi'
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

const ImageCard = ({ idProject }) => {
    const { data: imageUrl, isLoading } = useGetImageQuery(idProject, { skip: !idProject })
    return isLoading ? (
        <Container style={{ height: '15rem' }}>
            <Skeleton className="mt-2 h-100" />
        </Container>
    ) : (
        <Card.Img style={{ height: '12rem', objectFit: 'cover' }} variant="center" src={imageUrl} alt="" />
    )
}

export default ImageCard
