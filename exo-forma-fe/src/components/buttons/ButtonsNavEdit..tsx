import React from 'react'
import { Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface ButtonProps {
    save: () => void;
    clear: () => void;
}

const ButtonsNavEdit = ({ save, clear }: ButtonProps) => {
    return (
        <Stack direction="row" spacing={2} sx={{ my: 4 }}>
            <Button size="large" startIcon={<ArrowBackIosIcon />} variant="outlined" onClick={() => window.history.back()}>
                Indietro
            </Button>
            <Button size="large" startIcon={<AutoFixHighIcon />} variant="contained" onClick={() => clear()}>
                Ripulisci
            </Button>
            <Button size="large" startIcon={<SaveAsIcon />} variant="contained" onClick={() => save()}>
                Salva
            </Button>
            <Button color={'secondary'} size="large" startIcon={<NavigateNextIcon />} variant="contained" onClick={() => save()}>
                Avanti
            </Button>
        </Stack>
    )
}

export default ButtonsNavEdit
