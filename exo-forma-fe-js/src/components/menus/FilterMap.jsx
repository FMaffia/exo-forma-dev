import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered'

export const FilterMap = {
    TUTTI: {},
    COMPLETATI: {
        label: 'Completati',
        icon: <FontAwesomeIcon fontSize={14} className="text-primary mx-1" icon={faFlagCheckered} />
    },
    IN_CORSO: {
        label: 'In corso',
        icon: <FontAwesomeIcon fontSize={14} className="text-primary mx-1" icon={faHourglassHalf} />
    },
    BOZZA: {
        label: 'In bozza',
        icon: <FontAwesomeIcon fontSize={14} className="text-primary mx-1" icon={faFlagCheckered} />
    }
}
