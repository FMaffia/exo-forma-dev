import { MenuFilter, MenuObject, Steps } from './models'
import { PROJECT_ROOT } from '../utility/Routes'
import React from 'react'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import { sortBy } from 'lodash'
import EmojiFlagsOutlinedIcon from '@mui/icons-material/EmojiFlagsOutlined'

export const stepMenuFunc = (steps: Steps[]): MenuObject[] => {
    let array = steps.map(s => ({
        menuLabel: s.title,
        order: s.number,
        path: '/' + s.number,
        filter: MenuFilter.TUTTI,
        icon: s.completed ? <EmojiFlagsOutlinedIcon color={'primary'} fontSize="large" /> : <PlayCircleOutlineRoundedIcon fontSize="large" />
    }))
    return sortBy(array, [a => a.order, 'asc'])
}
export const drawnerMenu: MenuObject[] = [
    {
        menuLabel: 'Tutti i progetti',
        order: 0,
        path: PROJECT_ROOT,
        filter: MenuFilter.TUTTI,
        icon: <AppsOutlinedIcon color={'primary'} fontSize="small" />
    },
    {
        menuLabel: 'Progetti in corso',
        order: 1,
        path: PROJECT_ROOT,
        filter: MenuFilter.IN_CORSO,
        icon: <HourglassBottomIcon color={'primary'} fontSize="small" />
    },
    {
        menuLabel: 'Progetti completati',
        order: 2,
        path: PROJECT_ROOT,
        filter: MenuFilter.COMPLETATI,
        icon: <MilitaryTechIcon color={'primary'} fontSize="small" />
    }
]
