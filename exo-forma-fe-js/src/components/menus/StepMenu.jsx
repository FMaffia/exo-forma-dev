import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetStepsByIdQuery } from '../../api/projectsApi'
import List from '@mui/material/List'
import { Divider, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { stepMenuFunc } from '../../models/menuItems'
import { Save } from '@mui/icons-material'

const StepMenu = ({ currentProject }) => {
    const navigate = useNavigate()
    const { numberStep } = useParams()
    const { data: steps } = useGetStepsByIdQuery(currentProject?.id, {
        skip: !currentProject?.id,
        refetchOnMountOrArgChange: true
    })
    const handleClick = menu => {
        // @ts-ignore
        if (menu?.number <= currentProject?.lastStep) {
            let basePath = `/progetti/${currentProject?.path}`
            navigate(basePath + menu.path)
        }
    }

    useEffect(() => {
        // @ts-ignore
        const element = document.getElementById(`step-${numberStep}`)
        element?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(`/progetti/${currentProject?.path}`)}>
                    <ListItemIcon>
                        <Save color={'primary'} sx={{ mr: 2 }} />
                    </ListItemIcon>
                    <ListItemText primary={` Salva e esci`} />
                </ListItemButton>
            </ListItem>

            <Divider />
            <Typography sx={{ p: 2, fontWeight: 600, pb: 1 }} variant={'h5'} color={'inherit'}>
                <span style={{ color: purple[600] }}>{currentProject?.title}</span>
            </Typography>

            <Divider />
            {steps &&
                // @ts-ignore
                stepMenuFunc(steps, currentProject?.lastStep).map(menu => (
                    <ListItem selected={+numberStep === menu.number} key={menu.menuLabel} disablePadding id={`step-${menu.number}`}>
                        <ListItemButton disabled={menu.disabled} onClick={() => handleClick(menu)}>
                            <ListItemIcon sx={{ color: theme => (+numberStep === menu.number ? theme.palette.primary.main : 'gray') }}>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={`Step ${menu.order}`}
                                primaryTypographyProps={{
                                    fontSize: +numberStep === menu.number ? '1.2rem' : '1rem',
                                    fontWeight: +numberStep === menu.number ? '800' : '400',
                                    color: theme => (+numberStep === menu.number ? theme.palette.primary.main : 'gray')
                                }}
                                secondary={menu.menuLabel}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    )
}

export default StepMenu
