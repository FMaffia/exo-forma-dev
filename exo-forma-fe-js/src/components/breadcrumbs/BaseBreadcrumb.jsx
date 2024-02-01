import * as React from 'react'
import { MenuFilter } from '../../models/menuItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumb } from 'react-bootstrap'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import { PROJECT_ROOT } from '../../constants/Routes'
import { useDispatch } from 'react-redux'
import { setFilterProject } from '../../slices/uiSlice'
import mapLabel from '../../models/mapLabels.json'

export default function BaseBreadcrumb() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const onClickFunc = e => {
        e.preventDefault()
        dispatch(setFilterProject(MenuFilter.TUTTI))
        navigate(PROJECT_ROOT)
    }
    return (
        <Breadcrumb className={'opacity-75'}>
            {location.pathname
                .split('/')
                .slice(1)
                .map((loc, index) => (
                    <Breadcrumb.Item className={''} key={loc} onClick={onClickFunc}>
                        {index === 0 && <FontAwesomeIcon className="me-1" fontSize={13} icon={faFolderOpen} />}
                        {mapLabel[loc]}
                    </Breadcrumb.Item>
                ))}
        </Breadcrumb>
    )
}
