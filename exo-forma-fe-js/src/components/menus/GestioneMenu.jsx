import { useNavigate } from 'react-router-dom'
import useKeyRoles from '../../hooks/useKeyRoles'
import { adminMenu } from '../../models/menuItems'
import ButtonMenu from './ButtonMenu'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterProject } from '../../slices/uiSlice'

const GestioneMenu = () => {
    const filter = useSelector(state => state.ui.filterProject)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useKeyRoles()

    const handleClickFilter = menu => {
        dispatch(setFilterProject(menu.filter))
        handleClick(menu)
    }
    const handleClick = menu => {
        if (menu.filter !== filter) {
            navigate(menu.path)
        }
    }

    return (
        <div className=" d-flex flex-column ">
            <div className="d-flex flex-row flex-lg-column justify-content-evenly align-items-center">
                {adminMenu.map(m => (
                    <div key={m.path} className={'w-100 my-1'}>
                        <ButtonMenu m={m} handleClick={handleClickFilter} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GestioneMenu
