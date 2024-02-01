import React from 'react'
import { Col, NavDropdown, Row } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import UserInfo from '../components/menus/UserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminMenu, ricercaMenu } from '../models/menuItems'
import { useDispatch } from 'react-redux'
import { setFilterProject } from '../slices/uiSlice'
import useKeyRoles from '../hooks/useKeyRoles'
import { GESTIONE_ROOT, PROJECT_ROOT } from '../constants/Routes'
import Container from 'react-bootstrap/Container'

const MenuApp = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const role = useKeyRoles()

    const isActive = (pathLink, exact) => {
        return !exact ? location.pathname.startsWith(pathLink) : location.pathname === pathLink
    }
    const handleClickFilter = menu => {
        if (menu.filter) {
            dispatch(setFilterProject(menu.filter))
            navigate(menu.path)
            return
        }
        navigate(menu.path)
    }
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container fluid={true}>
                <Row className="w-100">
                    <Col className="text-center" sm={2} md={2}>
                        <Nav className="justify-content-center">
                            <UserInfo />
                        </Nav>
                    </Col>
                    <Col sm={10} md={10}>
                        <Nav className="me-auto">
                            <NavDropdown active={isActive(PROJECT_ROOT, false)} title={'Progetti Formazione'} id="basic-nav-dropdown">
                                {ricercaMenu.map(menu => (
                                    <NavDropdown.Item active={isActive(menu.path, true)} key={menu.path} onClick={() => handleClickFilter(menu)}>
                                        {menu.icon} {menu.menuLabel}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            {role === 'ADMIN' && (
                                <NavDropdown active={isActive(GESTIONE_ROOT, false)} title={'Gestione progetti'} id="basic-nav-dropdown">
                                    {adminMenu.map(menu => (
                                        <NavDropdown.Item key={menu.path} onClick={() => handleClickFilter(menu)}>
                                            {menu.icon} {menu.menuLabel}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            )}
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default MenuApp
