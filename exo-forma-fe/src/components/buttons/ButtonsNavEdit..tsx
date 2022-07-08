import React from "react";
import {Button, Stack} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {useNavigate} from "react-router-dom";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

interface ButtonProps {
    save: () => void,
    clear: () => void
}

const ButtonsNavEdit = ({save, clear}: ButtonProps) => {
    const navigate = useNavigate()
    return (
        <Stack direction="row" spacing={2} sx={{my: 4}}>
            <Button
                size="large"
                startIcon={<ArrowBackIosIcon/>}
                variant="outlined"
                onClick={() => navigate(-1)}
            >
                Indietro
            </Button>
            <Button
                size="large"
                startIcon={<AutoFixHighIcon/>}
                variant="contained"
                onClick={() => clear()}
            >
                Ripulisci
            </Button>
            <Button
                size="large"
                startIcon={<SaveAsIcon/>}
                variant="contained"
                onClick={() => save()}
            >
                Salva
            </Button>
        </Stack>
    );
};

export default ButtonsNavEdit;
