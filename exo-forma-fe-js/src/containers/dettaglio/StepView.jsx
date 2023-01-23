import React from 'react'
import { useGetStepsByIdQuery } from '../../api/projectsApi'
import { Badge } from 'react-bootstrap'
import clsx from 'clsx'

const StepView = ({ currentProject }) => {
    const { data: steps } = useGetStepsByIdQuery(currentProject?.id, {
        skip: !currentProject?.id,
        refetchOnMountOrArgChange: true
    })
    return steps?.map(s => (
        <div className="row align-items-center" key={s.number}>
            <div className="col-auto ">
                <h2>
                    <Badge bg={clsx(s.completed ? 'secondary' : 'primary')}> {s.number}</Badge>
                </h2>
            </div>
            <div className="col-8 ">
                <h5 className="m-0"> {s.title}</h5>
            </div>
        </div>
    ))
}

export default StepView
