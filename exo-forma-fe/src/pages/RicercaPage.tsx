import React from 'react'
import { Box, Fade } from '@mui/material'
import RisultatiRicerca from '../containers/ricerca/RisultatiRicerca'
import FiltriRicercaContainer from '../containers/ricerca/FiltriRicercaContainer'

const RicercaPage = () => {
    return (
        <Fade timeout={1000} in={true} unmountOnExit>
            <Box>
                <Box sx={{ my: 2 }}>
                    <FiltriRicercaContainer />
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <RisultatiRicerca />
                </Box>
            </Box>
        </Fade>
    )
}

export default RicercaPage
