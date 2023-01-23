import React from 'react'
import { Col, Row } from 'react-bootstrap'
import HeaderDetail from './HeaderDetail'

const DettaglioContainer = ({ currentProject }) => {
    const prefix = 'data:image/png;base64,'
    const srcImage = prefix + currentProject.image
    return (
        <Row>
            <Col sm={12}>
                <HeaderDetail currentProject={currentProject} />
            </Col>
            <Col sm={12}>
                <Row>
                    <Col sm={12} md={8}>
                        colonna 1
                    </Col>
                    <Col sm={12} md={4}>
                        colonna 2
                    </Col>
                </Row>
            </Col>
        </Row>

        /*<Fade timeout={1000} in={true} unmountOnExit>
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
<BodyDetail currentProject={currentProject} />
</Box>
</Fade>;*/
    )
}

export default DettaglioContainer
