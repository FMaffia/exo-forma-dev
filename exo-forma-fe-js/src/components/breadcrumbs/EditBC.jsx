import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";


export default function EditBC() {
    const navigate = useNavigate()
    const onClickFunc = (e) => {
        e.preventDefault()
        navigate('/progetti')
    }
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 2}}>
                <Link
                    underline="hover"
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="inherit"
                    href="/"
                    onClick={onClickFunc}
                >
                    <HomeIcon color={"primary"} sx={{mr: 0.5}} fontSize="inherit"/>
                    Progetti
                </Link>
                <Typography
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="text.primary"
                >
                    Edita
                </Typography>
            </Breadcrumbs>
        </div>
    );
}