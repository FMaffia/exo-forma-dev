import React from 'react'
import { Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

interface ButtonProps {
    started: boolean;
}

const ButtonBarDetails = ({ started }: ButtonProps) => {
    return (
        <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 2 }}>
            <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => window.history.back()}>
                Indietro
            </Button>
            <Button variant="contained" size="large" startIcon={<PlayCircleFilledIcon />} onClick={() => window.history.back()}>
                Inizia
            </Button>
            {started && (
                <Button variant="contained" size="large" startIcon={<RestartAltIcon />} onClick={() => window.history.back()}>
                    Riprendi
                </Button>
            )}
        </Stack>
    )
}

export default ButtonBarDetails
