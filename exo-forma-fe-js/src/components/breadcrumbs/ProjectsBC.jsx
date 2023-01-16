import * as React from 'react'
import { MenuFilter } from '../../models/menuItems'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterMap } from '../menus/FilterMap'
import { Breadcrumb } from 'react-bootstrap'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import { PROJECT_ROOT } from '../../constants/Routes'

export default function ProjectsBC({ filter, setFilter }) {
    const navigate = useNavigate()
    const onClickFunc = e => {
        e.preventDefault()
        setFilter(MenuFilter.TUTTI)
        navigate(PROJECT_ROOT)
    }
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/" onClick={onClickFunc}>
                <FontAwesomeIcon className="me-1" fontSize={13} icon={faFolderOpen} />
                Progetti
            </Breadcrumb.Item>
            {filter && filter !== MenuFilter.TUTTI && (
                <Breadcrumb.Item active>
                    {' '}
                    {FilterMap[filter]?.icon}
                    {FilterMap[filter]?.label}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}
