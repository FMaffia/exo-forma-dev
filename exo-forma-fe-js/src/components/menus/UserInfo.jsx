import React from 'react'
import woman from '../../img/woman.png'
import { UNAUTHORIZED } from '../../constants/UserRole'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { useKeycloak } from '@react-keycloak/web'
import useKeyRoles from '../../hooks/useKeyRoles'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle'
import useKeyInfos from '../../hooks/useKeyInfos'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const UserInfo = () => {
    const { keycloak } = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()
    const username = useKeyInfos()
    const isAdmin = role === 'ADMIN'

    return (
        <div className="dropdown">
            <a
                href="#"
                className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {isAdmin ? <FontAwesomeIcon size={'lg'} icon={faPencilAlt} /> : <FontAwesomeIcon size={'lg'} icon={faUserCircle} />}
            </a>
            <p>{username}</p>
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
