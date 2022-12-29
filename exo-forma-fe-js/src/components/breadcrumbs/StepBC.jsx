import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate, useParams} from "react-router-dom";

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function StepBC({currentProject}) {
    const {numberStep} = useParams()
    const navigate = useNavigate()

    const onClickFunc = (e, path) => {
        e.preventDefault()
        navigate(path)
    }
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 2}}>
                <Link
                    underline="hover"
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="inherit"
                    href="/"
                    onClick={(e) => onClickFunc(e, '/progetti')}
                >
                    <HomeIcon color={"primary"} sx={{mr: 0.5}} fontSize="inherit"/>
                    Progetti
                </Link>
                <Link
                    underline="hover"
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="inherit"
                    onClick={(e) => onClickFunc(e, '/progetti/' + currentProject.path)}
                    href="/"
                >
                    {currentProject.title}
                </Link>
                <Typography
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="text.primary"
                >
                    Step {numberStep}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}