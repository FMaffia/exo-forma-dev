import React from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const ButtonMenu = ({ m, handleClick }) => {
    const location = useLocation()

    return (
        <Button
            className={' p-2 btn col-12 shadow-sm'}
            variant={location.pathname === m.path ? 'primary' : 'outline-primary'}
            onClick={() => handleClick(m)}
            style={{ minHeight: '3rem', minWidth: '100%' }}
        >
            {m.icon}
            <br /> <span className="d-none d-sm-block small">{m.menuLabel}</span>
        </Button>
    )
}

export default ButtonMenu
