import React from 'react'
import { Badge } from 'react-bootstrap'
import clsx from 'clsx'

const CustomTags = ({ c }) => {
    const generateColor = () => {
        if (c === 'BE') {
            return 'be-badge'
        }
        if (c === 'FE') {
            return 'fe-badge'
        }
        if (c === 'SYSTEM') {
            return 'system-badge'
        }
        return 'primary'
    }

    return <Badge key={c} bg={clsx(generateColor(), 'me-2')}>{`#${c}`}</Badge>
}

export default CustomTags
