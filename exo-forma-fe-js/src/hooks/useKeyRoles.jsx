import { useKeycloak } from '@react-keycloak/web'

const useKeyRoles = () => {
    const { keycloak } = useKeycloak()


    if (keycloak?.hasResourceRole('Editor', keycloak?.tokenParsed?.azp)) {
        return 'ADMIN'
    }
    if (keycloak?.hasResourceRole('Reader', keycloak?.tokenParsed?.azp)) {
        return 'USER'
    }
    return 'UNAUTHORIZED'
}

export default useKeyRoles
