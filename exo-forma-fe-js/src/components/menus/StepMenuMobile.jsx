import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { stepMenuFunc } from '../../models/menuItems'
import { Badge } from 'react-bootstrap'
import { useGetStepsByIdQuery } from '../../api/projectsApi'
import { useNavigate, useParams } from 'react-router-dom'

const StepMenuMobile = ({ currentProject }) => {
    const navigate = useNavigate()
    const { numberStep } = useParams()

    const { data: steps } = useGetStepsByIdQuery(currentProject?.id, {
        skip: !currentProject?.id,
        refetchOnMountOrArgChange: true
    })
    const handleClick = menu => {
        if (menu?.number <= currentProject?.lastStep) {
            let basePath = `/progetti/${currentProject?.path}`
            navigate(basePath + menu.path)
        }
    }

    const colorStep = menu => {
        //è quello corrente
        if (+numberStep === menu.number) {
            return 'primary'
        }
        if (menu.disabled) {
            return 'dark'
        }
        return 'warning'
    }

    const expand = false
    return (
        <Navbar key={'md'} bg="" expand={expand} className="d-block d-md-none flex-grow-1" collapseOnSelect>
            <Container fluid className="justify-content-end">
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Collapse id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        {stepMenuFunc(steps, currentProject?.lastStep)?.map(s => (
                            <Nav.Link key={s.number} onClick={() => handleClick(s)}>
                                <Badge className="me-2" bg={colorStep(s)}>
                                    {' '}
                                    {s.number}
                                </Badge>
                                {s.menuLabel}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StepMenuMobile
