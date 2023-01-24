import React, { useState } from 'react'
import UserInfo from './UserInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlay, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateLastStepMutation } from '../../api/projectsUserApi'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { PROJECT_ROOT } from '../../constants/Routes'
import clsx from 'clsx'

const DetailsMenu = ({ currentProject }) => {
    const navigate = useNavigate()
    const isStarted = currentProject?.lastStep > 0
    const isFinished = currentProject?.lastStep > currentProject?.stepsCount
    const [triggerRestart, setTriggerRestart] = useState(false)
    const [updateLastStep] = useUpdateLastStepMutation()
    const { projectPath } = useParams()
    const percentageInternal = currentProject?.lastStep ? ((currentProject?.lastStep - 1) * 100) / currentProject?.stepsCount : 0

    const continueStep = () => {
        if (isFinished) {
            navigate('/progetti/' + projectPath + '/step/' + (currentProject.lastStep - 1))
            return
        }
        navigate('/progetti/' + projectPath + '/step/' + currentProject.lastStep)
    }

    const mapViewButton = () => {
        let arrayButton = ['INDIETRO']
        if (!isStarted) {
            arrayButton.unshift('INIZIA')
            return arrayButton
        }
        if (isFinished) {
            arrayButton.unshift('RIVEDI')
            arrayButton.unshift('RICOMINCIA')
            return arrayButton
        }
        arrayButton.unshift('RICOMINCIA')
        arrayButton.unshift('RIPRENDI')
        return arrayButton
    }

    const makeButton = (icon, label, func, outline) => {
        return (
            <button key={label} className={clsx(outline ? 'btn-outline-primary' : 'btn btn-primary', 'btn m-1 ')} onClick={func}>
                <span>
                    <FontAwesomeIcon className={'mx-auto d-block mb-1'} icon={icon} />
                    {label}
                </span>
            </button>
        )
    }

    const mapButton = {
        INIZIA: makeButton(faPlay, 'Inizia a progettare', () => setTriggerRestart(true)),
        RIVEDI: makeButton(faFlagCheckered, 'Rivedi steps', () => continueStep(true)),
        RICOMINCIA: makeButton(faRotateLeft, 'Ricomincia', () => setTriggerRestart(true)),
        RIPRENDI: makeButton(faPlay, `Riprendi dallo STEP ${currentProject?.lastStep}`, () => continueStep(true)),
        INDIETRO: makeButton(faArrowLeft, `Indietro`, () => navigate(PROJECT_ROOT), true)
    }
    const restartAction = () => {
        const requestBody = {
            lastStep: 0,
            idProject: currentProject?.id
        }
        updateLastStep(requestBody)
        navigate('/progetti/' + projectPath + '/step/1')
        setTriggerRestart(false)
    }
    return (
        <div className=" d-flex flex-column p-0 p-md-2 mb-2 ">
            <div className="d-flex flex-row flex-lg-column justify-content-evenly">
                <UserInfo />
                <p className="d-none d-lg-block fw-bold text-center text-primary">{currentProject?.title}</p>
                <CircularProgressbar
                    className="d-none d-lg-block"
                    value={percentageInternal}
                    text={`${percentageInternal.toFixed(0)}%`}
                    styles={buildStyles({
                        textColor: '#6a1b9a',
                        pathColor: '#6a1b9a',
                        pathTransition: percentageInternal === 0 ? 'none' : 'stroke-dashoffset 0.5s ease 0s'
                    })}
                />
                <br />
                {mapViewButton().map(k => mapButton[k])}
                <ConfirmDialog
                    body={`Sei sicuro di iniziare il progetto ?`}
                    open={triggerRestart}
                    handleClose={() => setTriggerRestart(false)}
                    handleConfirm={restartAction}
                />
            </div>
        </div>
    )
}

export default DetailsMenu
