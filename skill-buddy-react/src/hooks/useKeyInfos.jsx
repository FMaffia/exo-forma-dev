import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'

const useKeyInfos = () => {
    const { keycloak } = useKeycloak()
    const [username, setUsername] = useState()
    useEffect(() => {
        keycloak.loadUserInfo().then(a => setUsername(a.name))
    }, [])

    return username
}

export default useKeyInfos
