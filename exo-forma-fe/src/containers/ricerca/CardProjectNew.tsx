import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PROJECT_ROOT_NEW} from "../../utility/Routes";


const CardProject = () => {
    const navigate = useNavigate();
    return (
        <Card sx={{maxWidth: "100%", minHeight: "20rem", position: "relative"}}>
            <CardActionArea onClick={() => navigate(PROJECT_ROOT_NEW)}>
                <CardHeader sx={{pt: 2, pb: 0}} title="Crea nuovo progetto"/>
                <CardContent
                    sx={{py: 0, justifyContent: "left"}}
                >
                    crea nuovo
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardProject;
