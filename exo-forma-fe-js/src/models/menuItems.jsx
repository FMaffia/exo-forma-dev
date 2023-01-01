import React from 'react'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import {sortBy} from 'lodash'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const MenuFilter = {
    TUTTI: "TUTTI",
    IN_CORSO: "IN_CORSO",
    COMPLETATI: "COMPLETATI",
    BOZZA: "BOZZA"
}

export const stepMenuFunc = (steps, lastStep) => {
    let array = steps.map(s => ({
        menuLabel: s.title,
        order: s.number,
        number: s.number,
        path: '/step/' + s.number,
        disabled: !s.completed && s.number !== lastStep,
        icon: s.completed ? <CheckCircleIcon color={'primary'} fontSize="large"/> :
            <PlayCircleOutlineRoundedIcon fontSize="large"/>
    }))
    return sortBy(array, [a => a.order, 'asc'])
}
export const drawnerMenu = [
    {
        menuLabel: 'Progetti in corso',
        order: 1,
        path: "/progetti/in-corso",
        filter: MenuFilter.IN_CORSO,
        icon: <HourglassBottomIcon color={'primary'} fontSize="small"/>
    },
    {
        menuLabel: 'Progetti completati',
        order: 2,
        path: "/progetti/completati",
        filter: MenuFilter.COMPLETATI,
        icon: <MilitaryTechIcon color={'primary'} fontSize="small"/>
    }
]
