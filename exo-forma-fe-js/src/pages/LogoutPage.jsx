import { useKeycloak } from '@react-keycloak/web'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'

const LoginPage = () => {
    const { keycloak } = useKeycloak()

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'no-wrap',
                alignItems: 'center',
                margin: 'auto'
            }}
        >
            <span className={'d-block'} style={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'primary'}>
                Fare la login per accedere all'applicazione
            </span>
            <Button color={'primary'} onClick={() => keycloak.login({ redirectUri: 'http://localhost:3000' })}>
                Login
            </Button>
        </Container>
    )
}

export default LoginPage
