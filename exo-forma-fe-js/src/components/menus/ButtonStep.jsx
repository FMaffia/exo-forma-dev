import React from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { STEP_FORM_PATH } from '../../constants/Routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const ButtonStep = ({ step, handleClick }) => {
    const location = useLocation()
    const isActiveStep = () => {
        return location.pathname === STEP_FORM_PATH + step?.number
    }
    return (
        <Button className={'w-100 d-flex btn col-12 shadow-sm'} variant={isActiveStep() ? 'primary' : 'outline-primary'} onClick={handleClick}>
            <div>
                <FontAwesomeIcon icon={faPlay} className={'me-2'} />
            </div>
            <div className={'text-start'}>
                <span>Step {step?.number}</span>
                <span className="d-block " style={{ fontSize: '0.8rem' }}>
                    {step?.title}
                </span>
            </div>
        </Button>
    )
}

export default ButtonStep
