import React from 'react'
import { Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const ButtonBarDetails = () => {
    return (
        <Stack direction="row" spacing={2} sx={{ my: 4 }}>
            <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => null}>
                Indietro
            </Button>
            {/* <Button
        size="large"
        variant="contained"
        startIcon={<OutlinedFlagRoundedIcon />}
        onClick={() => navigate(PROJECT_ROOT)}
      >
        Inizia a progettare
      </Button>*/}
        </Stack>
    )
}

export default ButtonBarDetails
