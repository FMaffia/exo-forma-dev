import React from 'react'
import { useGetImageQuery } from '../../api/projectsApi'
import Skeleton from 'react-loading-skeleton'
import { Badge, Col, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const HeaderDetail = ({ currentProject }) => {
    const { data: srcImage, isLoading } = useGetImageQuery(currentProject.id, { skip: !currentProject?.id })
    return isLoading ? (
        <Skeleton height={300} />
    ) : (
        <Row className="bg-white border shadow-sm mb-4">
            <Col xs={12} md={5} className="p-0">
                <Image
                    className=""
                    style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover'
                    }}
                    src={srcImage}
                    alt={''}
                />
            </Col>
            <Col className="ps-4 pe-0 d-flex flex-column  justify-content-center" xs={12} md={7}>
                <div className="h1">{currentProject?.title}</div>
                <span>
                    <FontAwesomeIcon icon={faCalendarDay} className="me-2 text-primary" />
                    Creato il : {currentProject?.creationDate}
                </span>
                <span className="">
                    <FontAwesomeIcon icon={faUser} color={'primary'} className="me-2 text-primary" />
                    Autore : <span className="fw-bold"> {currentProject.author}</span>
                </span>
                <div className="d-flex mt-2 mb-2">
                    {currentProject?.categories.map(c => (
                        <Badge key={c} bg="secondary" className="me-1 p-2">
                            {`#${c}`}
                        </Badge>
                    ))}
                </div>
            </Col>
        </Row>
    )
}

export default HeaderDetail
