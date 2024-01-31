import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import * as React from 'react'

export default function StepBC({ currentProject }) {
    const { numberStep } = useParams()
    const navigate = useNavigate()

    const onClickFunc = (e, path) => {
        e.preventDefault()
        navigate(path)
    }
    return (
        <div className="">
            <Breadcrumb className="align-baseline mb-0 mb-md-2">
                <Breadcrumb.Item href="/" onClick={e => onClickFunc(e, '/progetti')}>
                    <FontAwesomeIcon className="me-1" fontSize={13} icon={faFolderOpen} />
                    Progetti
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={e => onClickFunc(e, '/progetti/' + currentProject.path)}>{currentProject.title}</Breadcrumb.Item>
                <Breadcrumb.Item active>Step {numberStep}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
