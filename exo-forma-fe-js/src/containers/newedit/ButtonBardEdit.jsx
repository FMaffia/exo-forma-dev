import React from 'react';
import {Button, Stack} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveAs from "@mui/icons-material/SaveAs";
import {useNavigate} from "react-router-dom";
import {PROJECT_ROOT} from "../../constants/Routes";
import PublicIcon from "@mui/icons-material/Public";
import {useUpdateMutation} from "../../api/projectsApi";
import {useSelector} from "react-redux";

const ButtonBardEdit = () => {
    const navigate = useNavigate();
    const reduxProject = useSelector(state => state.currentProject)

    const [update, {isLoading}] = useUpdateMutation()
    const saveAs = () => {
        update(reduxProject)
    }
    const publicProject = () => {
        console.log("public")
    }
    return (
        <Stack direction="row" spacing={2} sx={{mt: 4, mb: 2, justifyContent: "space-between"}}>
            <Button size="large" startIcon={<ArrowBackIosIcon/>} variant="outlined"
                    onClick={() => navigate(PROJECT_ROOT)}>
                Indietro
            </Button>
            <Button size="large" startIcon={<SaveAs/>} variant="contained"
                    onClick={() => saveAs()}>
                Salva
            </Button>
            <Button size="large" startIcon={<PublicIcon/>} variant="contained" color={"secondary"}
                    onClick={() => publicProject()}>
                Pubblica
            </Button>
        </Stack>
    );
};

export default ButtonBardEdit;