import React from 'react'
import { Avatar, Box, Button } from '@mui/material'
import unauth from '../../img/unauth.png'
import Typography from '@mui/material/Typography'
import { useKeycloak } from '@react-keycloak/web'

const UnauthorizedPage = () => {
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
            <Avatar variant="square" sx={{ p: 1, m: 'auto', height: '256px', width: 'auto' }} alt="Remy Sharp" src={unauth} />

            <Typography variant="body1" display="block" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'red'}>
                Non sei autorizzato ad accedere a questa applicazione.
            </Typography>
            <Button
                color={'primary'}
                onClick={() => {
                    keycloak.logout()
                }}
            >
                Ritorna alla login
            </Button>
        </Box>
    )
}

export default UnauthorizedPage
