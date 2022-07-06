import React from "react";
import {Button, Stack} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";

const ButtonBarDetails = () => {
    const navigate = useNavigate();

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
            {/* <Button
        size="large"
        variant="contained"
        startIcon={<OutlinedFlagRoundedIcon />}
        onClick={() => navigate(PROJECT_ROOT)}
      >
        Inizia a progettare
      </Button>*/}
        </Stack>
    );
};

export default ButtonBarDetails;
