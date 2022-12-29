import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import {MenuFilter} from "../../models/menuItems";
import {FilterMap} from "../menus/FilterMap";
import {useNavigate} from "react-router-dom";


export default function ProjectsBC({filter, setFilter}) {
    const navigate = useNavigate()
    const onClickFunc = (e) => {
        e.preventDefault()
        setFilter(MenuFilter.TUTTI)
        navigate('/progetti')
    }
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 2}}>
                <Link
                    onClick={onClickFunc}
                    underline="hover"
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon color={"primary"} sx={{mr: 0.5}} fontSize="inherit"/>
                    Progetti
                </Link>
                {filter && filter !== MenuFilter.TUTTI && <Typography
                    sx={{display: 'flex', alignItems: 'center'}}
                    color="text.primary"
                >
                    {FilterMap[filter]?.icon}
                    {FilterMap[filter]?.label}
                </Typography>}
            </Breadcrumbs>
        </div>
    );
}