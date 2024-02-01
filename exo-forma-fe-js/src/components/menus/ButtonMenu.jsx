import React from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const ButtonMenu = ({ m, handleClick }) => {
    const location = useLocation()

    return (
        <Button
            className={'w-100  text-start btn col-12 shadow-sm'}
            variant={location.pathname === m.path ? 'primary' : 'outline-primary'}
            onClick={() => handleClick(m)}
        >
            {m.icon}
            <span className=" ms-2 small">{m.menuLabel}</span>
        </Button>
    )
}

export default ButtonMenu
