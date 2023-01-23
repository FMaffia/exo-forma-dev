import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import { PROJECT_ROOT } from '../../constants/Routes'

export default function DetailBC({ currentProject }) {
    const navigate = useNavigate()
    const onClickFunc = e => {
        e.preventDefault()
        navigate(PROJECT_ROOT)
    }
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/" onClick={onClickFunc}>
                <FontAwesomeIcon className="me-1" fontSize={13} icon={faFolderOpen} />
                Progetti
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{currentProject.title}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
