import React from 'react'
import woman from '../../img/woman.png'
import { UNAUTHORIZED } from '../../constants/UserRole'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { useKeycloak } from '@react-keycloak/web'
import useKeyRoles from '../../hooks/useKeyRoles'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle'
import useKeyInfos from '../../hooks/useKeyInfos'
import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { NavDropdown } from 'react-bootstrap'

const UserInfo = () => {
    const { keycloak } = useKeycloak()
    const role = useKeyRoles()
    const username = useKeyInfos()
    const isAdmin = role === 'ADMIN'
    const titleAdmin = () => (
        <span>
            <FontAwesomeIcon className={' text-primary me-2'} size={'lg'} icon={faUserCircle} />

            <span>{username}</span>
        </span>
    )
    return (
        <NavDropdown title={titleAdmin()} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
                <FontAwesomeIcon className={'text-primary me-2'} icon={faInfoCircle} />
                Informazioni profilo
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={keycloak.logout} href="#">
                <FontAwesomeIcon className={'text-primary'} icon={faRightFromBracket} /> Esci
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default UserInfo
