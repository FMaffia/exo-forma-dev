import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useKeyRoles from '../../hooks/useKeyRoles'
import UserInfo2 from './UserInfo2'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { adminMenu, ricercaMenu } from '../../models/menuItems'
import clsx from 'clsx'
import { PROJECT_ROOT_NEW } from '../../constants/Routes'
import ConfirmDialog from '../../ui/ConfirmDialog'

const HomeMenu2 = ({ filter, setFilter }) => {
    const [open, setOpen] = React.useState(false)
    const target = useRef(null)

    const navigate = useNavigate()
    const location = useLocation()
    const role = useKeyRoles()
    const handleClickFilter = menu => {
        setFilter(menu.filter)
        handleClick(menu)
    }
    const handleClick = menu => {
        if (menu.path === PROJECT_ROOT_NEW) {
            setOpen(true)
            return
        }
        if (menu.filter !== filter) {
            navigate(menu.path)
        }
    }

    const renderTooltip = menu => {
        return (
            <Tooltip id={menu.path}>
                <span>{menu.menuLabel}</span>
            </Tooltip>
        )
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light " style={{ width: '5.5rem' }}>
            <UserInfo2 />
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                {ricercaMenu.map(m => (
                    <li key={m.path} className={'py-1 '}>
                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(m)}>
                            <Button
                                ref={target}
                                className={clsx(location.pathname === m.path && 'active', 'nav-link py-3 border-bottom col-12 shadow-sm')}
                                variant="link"
                                onClick={() => handleClickFilter(m)}
                            >
                                {m.icon}
                            </Button>
                        </OverlayTrigger>
                    </li>
                ))}
                {role === 'ADMIN' &&
                    adminMenu.map(m => (
                        <li key={m.path} className={'py-1 '}>
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(m)}>
                                <Button
                                    ref={target}
                                    className={clsx(location.pathname === m.path && 'active', 'nav-link py-3 border-bottom col-12 shadow-sm')}
                                    variant="link"
                                    onClick={() => handleClick(m)}
                                >
                                    {m.icon}
                                </Button>
                            </OverlayTrigger>
                        </li>
                    ))}
            </ul>
            <ConfirmDialog
                body="Sei sicuro di voler creare un nuovo progetto?"
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={() => {
                    navigate(PROJECT_ROOT_NEW)
                    setOpen(false)
                }}
            />
        </div>
    )
}

export default HomeMenu2
