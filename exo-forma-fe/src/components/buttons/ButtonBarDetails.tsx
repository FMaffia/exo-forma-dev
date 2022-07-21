import React from 'react'
import { Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const ButtonBarDetails = () => {
    return (
        <Stack direction="row" spacing={2} sx={{ my: 4 }}>
            <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => window.history.back()}>
                Indietro
            </Button>
        </Stack>
    )
}

export default ButtonBarDetails
