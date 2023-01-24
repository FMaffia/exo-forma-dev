import React from 'react'
import { Col, Row } from 'react-bootstrap'
import HeaderDetail from './HeaderDetail'
import Card from 'react-bootstrap/Card'
import StepView from './StepView'

const DettaglioContainer = ({ currentProject }) => {
    return (
        <Row>
            <Col sm={12}>
                <HeaderDetail currentProject={currentProject} />
            </Col>

            <Col className="ps-md-0 mb-2 mb-md-0" sm={12} md={8}>
                <Card>
                    <Card.Header>Descrizione</Card.Header>
                    <Card.Body>{currentProject?.desc}</Card.Body>
                </Card>
            </Col>
            <Col className="pe-md-0" sm={12} md={4}>
                <div className="d-flex flex-column">
                    <Card className="mb-2 mb-md-0">
                        <Card.Header>Risorse</Card.Header>
                        <Card.Body>Risorsa 1</Card.Body>
                    </Card>
                    <Card className="mt-md-3">
                        <Card.Header>Steps</Card.Header>
                        <Card.Body>
                            <StepView currentProject={currentProject} />
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>

        /*
<Fade timeout={1000} in={true} unmountOnExit>
<Box sx={{ width: "100%", mt: 1 }}>
<Paper sx={{ mb: 2 }}>
<Box
sx={{
display: "flex",
background: "linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)"
}}
>
{currentProject && <Avatar alt={currentProject.title} variant="square" src={srcImage} sx={{ width: "20rem", height: "inherit" }} />}
<HeaderDetailOLD currentProject={currentProject} />
</Box>
</Paper>
<BodyDetailOLD currentProject={currentProject} />
</Box>
</Fade>;
;
;
;*/
    )
}

export default DettaglioContainer
