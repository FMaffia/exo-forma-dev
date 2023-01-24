import React from 'react'
import woman from '../../img/woman.png'
import { UNAUTHORIZED } from '../../constants/UserRole'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { useKeycloak } from '@react-keycloak/web'
import useKeyRoles from '../../hooks/useKeyRoles'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle'

const UserInfo = () => {
    const { keycloak } = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()

    return (
        <div className="dropdown">
            <a
                href="#"
                className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img src={woman} alt="mdo" style={{ width: '3.5rem' }} className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                <li>
                    <button className="btn btn-link dropdown-item" type="submit">
                        <FontAwesomeIcon icon={faUserCircle} /> Profile
                    </button>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    {isLoggedIn && role !== UNAUTHORIZED && (
                        <button className="btn btn-link dropdown-item" type="submit" onClick={() => keycloak.logout()}>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
                        </button>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default UserInfo
