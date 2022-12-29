import React from 'react'
import { Avatar, Box, Button } from '@mui/material'
import loginImg from '../../img/log-in.png'
import Typography from '@mui/material/Typography'
import { useKeycloak } from '@react-keycloak/web'

const LogoutPage = () => {
    const { keycloak } = useKeycloak()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'no-wrap',
                alignItems: 'center',
                margin: 'auto',
                p: 2
            }}
        >
            <Avatar variant="square" sx={{ p: 1, m: 'auto', height: '256px', width: 'auto' }} alt="Remy Sharp" src={loginImg} />

            <Typography variant="body1" display="block" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'primary'}>
                Fare la login per accedere al'applicazione
            </Typography>
            <Button color={'primary'} onClick={() => keycloak.login({ redirectUri: 'http://localhost:3000' })}>
                Login
            </Button>
        </Box>
    )
}

export default LogoutPage
