import React, { useEffect } from 'react'
import List from '@mui/material/List'
import { Divider, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { MenuObject } from '../../types/models'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { useGetDetailsQuery, useGetStepsByIdQuery } from '../../api/projectsApi'
import { stepMenuFunc } from '../../types/menuItems'
import StepIndicator from '../details/StepIndicator'
import { useUpdateLastStepMutation } from '../../api/projectsUsersApi'

const StepMenu = () => {
    const navigate = useNavigate()
    const {
        params: { projectPath }
    } = useMatch()
    const {
        params: { numberStep }
    } = useMatch()
    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: steps } = useGetStepsByIdQuery(currentProject?.id, { skip: !currentProject?.id, refetchOnMountOrArgChange: true })
    const handleClick = (menu: MenuObject) => {
        // @ts-ignore
        if (menu?.number <= currentProject?.lastStep) {
            let basePath = `/progetti/dettaglio/${currentProject?.path}`
            navigate({ to: basePath + menu.path })
        }
    }

    useEffect(() => {
        // @ts-ignore
        const element = document.getElementById(`step-${numberStep}`)
        element?.scrollIntoView({ behavior: 'smooth' })
    }, [numberStep])

    return (
        <List>
            <Typography sx={{ p: 2, fontWeight: 600, pb: 1 }} variant={'h5'} color={'inherit'}>
                <span style={{ color: purple[600] }}>{currentProject?.title}</span>
            </Typography>
            <StepIndicator currentProject={currentProject} />
            <Divider />
            {steps &&
                stepMenuFunc(steps).map(menu => (
                    <ListItem selected={+numberStep === menu.number} key={menu.menuLabel} disablePadding id={`step-${menu.number}`}>
                        <ListItemButton onClick={() => handleClick(menu)}>
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
