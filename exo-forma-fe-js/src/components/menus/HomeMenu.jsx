import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useKeyRoles from '../../hooks/useKeyRoles'
import UserInfo2 from './UserInfo2'
import { adminMenu, ricercaMenu } from '../../models/menuItems'
import { PROJECT_ROOT_NEW } from '../../constants/Routes'
import ConfirmDialog from '../../ui/ConfirmDialog'
import ButtonMenu from './ButtonMenu'

const HomeMenu = ({ filter, setFilter }) => {
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate()
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

    return (
        <div className=" d-flex flex-column p-0 p-md-2 ">
            <div className="d-flex flex-row flex-lg-column justify-content-evenly">
                <UserInfo2 />
                {ricercaMenu.map(m => (
                    <div key={m.path} className={'py-1 '}>
                        <ButtonMenu m={m} handleClick={handleClickFilter} />
                    </div>
                ))}
                {role === 'ADMIN' &&
                    adminMenu.map(m => (
                        <div key={m.path} className={'py-1 '}>
                            <ButtonMenu m={m} handleClick={handleClick} />
                        </div>
                    ))}
            </div>
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

export default HomeMenu
