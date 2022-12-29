import React from 'react'
import { useKeycloak } from '@react-keycloak/web'

const UseKeyRoles = () => {
    const { keycloak } = useKeycloak()
    if (keycloak?.hasResourceRole('Admin', keycloak?.tokenParsed?.azp)) {
        return 'ADMIN'
    }
    if (keycloak?.hasResourceRole('User', keycloak?.tokenParsed?.azp)) {
        return 'USER'
    }
    return 'UNAUTHORIZED'
}

export default UseKeyRoles
