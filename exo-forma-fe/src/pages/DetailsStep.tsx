import React from 'react'
import { useMatch } from '@tanstack/react-location'

const DetailsStep = () => {
    const {
        params: { numberStep }
    } = useMatch()
    return <div>{numberStep}</div>
}

export default DetailsStep
