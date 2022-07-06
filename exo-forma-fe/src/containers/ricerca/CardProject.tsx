import React from "react";
import {Project} from "../../model/models";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Box, CardActionArea, Chip, LinearProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PROJECT_ROOT} from "../../utility/Routes";
import {END_POINT_LOAD_IMAGE} from "../../services/endpoint/URI_RESOURCES";
import {purple} from "@mui/material/colors";

interface Prop {
    project: Project;
}

const CardProject = ({project}: Prop) => {
    const navigate = useNavigate();
    const calculatePerc = project.lastStep
        ? (project.lastStep * 100) / project.stepsCount
        : undefined;
    const completed: boolean = project.lastStep === project.stepsCount;
    console.log(project.stepsCount)
    return (
        <Card sx={{maxWidth: "100%", position: "relative"}}>
            <CardActionArea onClick={() => navigate(PROJECT_ROOT + project.path)}>
                <CardHeader sx={{pt: 2, pb: 0, color: purple["600"]}} title={project.title}/>
                <CardContent
                    sx={{py: 0, justifyContent: "left"}}
                >
                    <Typography variant="body1">
                        {`Creato il ${project.creationDate}`}</Typography>
                    <Box sx={{display: "flex", color: "grey"}}>
                        <Typography variant="caption" component={"p"}>{project.authors} |
                            Difficoltà{` ${project.difficult}/3`} </Typography></Box>

                    {calculatePerc && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>

                            <Box sx={{width: '100%', mr: 1}}>
                                <LinearProgress
                                    sx={{height: "0.5rem", borderRadius: "0.3rem"}}
                                    variant="determinate"
                                    value={calculatePerc}
                                    color={completed ? "secondary" : "primary"}
                                />
                            </Box>
                            <Box sx={{minWidth: 35}}>
                                <Typography variant="body2" color="text.secondary">{`${Math.round(calculatePerc)}%`}</Typography>
                            </Box>
                        </Box>
                    )}
                    {/*    <StyledRating
                        name="customized-3"
                        readOnly
                        max={3}
                        defaultValue={project.difficult}
                        icon={<LocalFireDepartmentIcon/>}
                        emptyIcon={<LocalFireDepartmentIcon/>}
                        size="small"
                    />*/}
                </CardContent>
                <CardContent sx={{pt: 1, borderBottom: "0.5rem #c6ff00 solid"}}>
                    {project.categories.map((c) => (
                        <Chip
                            sx={{margin: "0.2rem"}}
                            key={c}
                            color="secondary"
                            label={`#${c}`}
                            size="small"
                        />
                    ))}
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image={END_POINT_LOAD_IMAGE + project.cover}
                    alt={project.cover}
                />
                <CardContent>
                    <Typography variant="body2">
            <span
                className="content"
                dangerouslySetInnerHTML={{__html: project.descBreve}}
            />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardProject;
