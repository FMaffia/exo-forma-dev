import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetStepsByIdQuery } from '../../api/projectsApi'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { stepMenuFunc } from '../../models/menuItems'
import { Badge } from 'react-bootstrap'

const StepMenu = ({ currentProject }) => {
    const navigate = useNavigate()
    const { numberStep } = useParams()
    const { data: steps } = useGetStepsByIdQuery(currentProject?.id, {
        skip: !currentProject?.id,
        refetchOnMountOrArgChange: true
    })
    const percentageInternal = currentProject?.lastStep ? ((currentProject?.lastStep - 1) * 100) / currentProject?.stepsCount : 0
    const handleClick = menu => {
        // @ts-ignore
        if (menu?.number <= currentProject?.lastStep) {
            let basePath = `/progetti/${currentProject?.path}`
            navigate(basePath + menu.path)
        }
    }

    const colorStep = menu => {
        //è quello corrente
        if (+numberStep === menu.number) {
            return 'primary'
        }
        if (menu.disabled) {
            return 'dark'
        }
        return 'warning'
    }
    return (
        <div className=" d-flex flex-column p-0 p-md-2 mb-2 ">
            <div className="d-flex flex-row flex-lg-column justify-content-evenly">
                <button className="btn btn-outline-primary" onClick={() => navigate(`/progetti/${currentProject?.path}`)}>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Salva e esci
                </button>
                <hr />
                <div className="row mt-3">
                    <div className="col-12">
                        <p className="mt-md-4 d-none d-lg-block  text-center text-muted">Percentuale completamento</p>
                    </div>
                    <div className="w-50 mx-auto ">
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
                    </div>
                    <p className="mt-md-4 d-none d-lg-block fw-bold text-center text-primary">{currentProject?.title}</p>
                </div>
                <hr />
                {stepMenuFunc(steps, currentProject?.lastStep)?.map(s => (
                    <button key={s.number} className="border-0 nav-link" onClick={() => handleClick(s)}>
                        <span className="row align-items-center" key={s.number}>
                            <span className="col-4 ">
                                <h3>
                                    <Badge bg={colorStep(s)}> {s.number}</Badge>
                                </h3>
                            </span>
                            <span className="col-8 text-start">{s.menuLabel}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default StepMenu
