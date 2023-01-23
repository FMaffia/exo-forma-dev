import React from 'react'

import { sortBy } from 'lodash'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered'
import { PROJECT_COMPLETATI, PROJECT_EDIT, PROJECT_IN_CORSO, PROJECT_ROOT, PROJECT_ROOT_NEW } from '../constants/Routes'
import { faAdd } from '@fortawesome/free-solid-svg-icons/faAdd'
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'

export const MenuFilter = {
    TUTTI: 'TUTTI',
    IN_CORSO: 'IN_CORSO',
    COMPLETATI: 'COMPLETATI',
    BOZZA: 'BOZZA'
}

export const stepMenuFunc = (steps, lastStep) => {
    let array = steps.map(s => ({
        menuLabel: s.title,
        order: s.number,
        number: s.number,
        path: '/step/' + s.number,
        disabled: !s.completed && s.number !== lastStep,
        icon: s.completed ? <CheckCircleIcon color={'primary'} fontSize="large" /> : <CheckCircleIcon fontSize="large" />
    }))
    return sortBy(array, [a => a.order, 'asc'])
}
export const ricercaMenu = [
    {
        menuLabel: 'Sfoglia progetti',
        order: 1,
        path: PROJECT_ROOT,
        filter: MenuFilter.TUTTI,
        icon: <FontAwesomeIcon icon={faFolderOpen} />
    },
    {
        menuLabel: 'Progetti in corso',
        order: 2,
        path: PROJECT_IN_CORSO,
        filter: MenuFilter.IN_CORSO,
        icon: <FontAwesomeIcon icon={faHourglassHalf} />
    },
    {
        menuLabel: 'Progetti completati',
        order: 2,
        path: PROJECT_COMPLETATI,
        filter: MenuFilter.COMPLETATI,
        icon: <FontAwesomeIcon icon={faFlagCheckered} />
    }
]
export const adminMenu = [
    {
        menuLabel: 'Aggiungi progetto',
        order: 4,
        path: PROJECT_ROOT_NEW,
        icon: <FontAwesomeIcon icon={faAdd} />
    },
    {
        menuLabel: 'Modifica',
        order: 5,
        path: PROJECT_EDIT,
        filter: MenuFilter.IN_CORSO,
        icon: <FontAwesomeIcon icon={faPencil} />
    }
]
