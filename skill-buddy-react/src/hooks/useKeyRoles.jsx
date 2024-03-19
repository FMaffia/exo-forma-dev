import {useKeycloak} from '@react-keycloak/web'

const useKeyRoles = () => {
    const {keycloak} = useKeycloak()

    if (keycloak?.hasResourceRole('Editor', keycloak?.tokenParsed?.azp)) {
        return 'Editor'
    }

    if (keycloak?.hasResourceRole('Reader', keycloak?.tokenParsed?.azp)) {
        return 'Reader'
    }
    if (keycloak?.hasResourceRole('Admin', keycloak?.tokenParsed?.azp)) {
        return 'Admin'
    }
    return 'UNAUTHORIZED'
}

export default useKeyRoles
