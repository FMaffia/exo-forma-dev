import React from "react";
import {Button, Stack} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface ButtonProps {
    value: number,
    func: (numberStep: number) => void;
}

const ButtonsNewProject = ({func, value}: ButtonProps) => {
    return (
        <Stack direction="row" spacing={2} sx={{my: 4}}>
            <Button
                size="large"
                disabled={value === 0}
                startIcon={<ArrowBackIosIcon/>}
                variant="outlined"
                onClick={() => func(0)}
            >
                Indietro
            </Button>
            <Button
                size="large"
                disabled={value === 1}
                startIcon={<NavigateNextIcon/>}
                variant="contained"
                onClick={() => func(1)}
            >
                Avanti
            </Button>
        </Stack>
    );
};

export default ButtonsNewProject;
