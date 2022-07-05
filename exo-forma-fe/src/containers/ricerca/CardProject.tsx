import React from "react";
import { Project } from "../../model/models";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import placeHolderImg from "../../img/default-placeholder.png";
import { CardActionArea, Chip, LinearProgress } from "@mui/material";
import { StyledRating } from "../../layout/CustomMui";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useNavigate } from "react-router-dom";
import { PROJECT_ROOT } from "../../utility/Routes";

interface Prop {
  project: Project;
}
const CardProject = ({ project }: Prop) => {
  const navigate = useNavigate();
  const calculatePerc = project.lastStep
    ? (project.lastStep * 100) / project.stepsCount
    : undefined;
  const completed: boolean = calculatePerc === 100;
  return (
    <Card sx={{ maxWidth: "100%", position: "relative" }}>
      {calculatePerc && (
        <LinearProgress
          sx={{ position: "absolute", width: "100%" }}
          variant="determinate"
          value={calculatePerc}
          color={completed ? "secondary" : "primary"}
        />
      )}
      <CardActionArea onClick={() => navigate(PROJECT_ROOT + project.path)}>
        <CardContent
          sx={{ pb: 0, display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="body2">{project.authors}</Typography>
          <StyledRating
            name="customized-3"
            readOnly
            max={3}
            defaultValue={project.difficult}
            icon={<LocalFireDepartmentIcon />}
            emptyIcon={<LocalFireDepartmentIcon />}
            size="small"
          />
        </CardContent>
        <CardHeader sx={{ py: 0 }} title={project.title} />
        <CardContent sx={{ pt: 1 }}>
          {project.categories.map((c) => (
            <Chip
              sx={{ margin: "0.2rem" }}
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
          image={placeHolderImg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <span
              className="content"
              dangerouslySetInnerHTML={{ __html: project.descBreve }}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProject;
