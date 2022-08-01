import { MenuFilter, MenuObject, Steps } from './models'
import { PROJECT_ROOT } from '../utility/Routes'
import React from 'react'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import { sortBy } from 'lodash'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const checkDisabled = (lastStep: number, menu: Steps): boolean => {
    if (lastStep == 0 && menu.number === 1) {
        return false
    }
    return lastStep >= menu.number
}
export const stepMenuFunc = (steps: Steps[], lastStep: number | 0): MenuObject[] => {
    let array = steps.map(s => ({
        menuLabel: s.title,
        order: s.number,
        number: s.number,
        path: '/step/' + s.number,
        filter: MenuFilter.TUTTI,
        disabled: !s.completed && s.number !== lastStep,
        icon: s.completed ? <CheckCircleIcon color={'primary'} fontSize="large" /> : <PlayCircleOutlineRoundedIcon fontSize="large" />
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
