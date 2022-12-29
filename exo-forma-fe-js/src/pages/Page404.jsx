import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Img from '../img/error404.png'
import Typography from '@mui/material/Typography'
import {useNavigate} from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate()
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
            <Avatar variant="square" sx={{p: 1, m: 'auto', height: '256px', width: 'auto'}} alt="Remy Sharp" src={Img}/>
            <Typography variant="body1" display="block" sx={{fontWeight: 'bold', fontSize: '1.2rem'}} color={'primary'}>
                Attenzione pagina non trovata
            </Typography>
            <Button color={'primary'} onClick={() => navigate({to: '/progetti'})}>
                Torna indietro
            </Button>
        </Box>
    )
}

export default Page404
