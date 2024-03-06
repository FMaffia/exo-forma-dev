import React from 'react';

const TimelineActivity = ({datas}) => {
    return <div className={"px-4 "}>

        <ul className="timeline-with-icons">
            {datas?.map(d =>
                    <li key={d.id} className="timeline-item mb-5">
            <span className="timeline-icon">
              <span className={d.icon}></span>
            </span>

                        <h5 className="fw-bold fs-6">{d.title}</h5>
                        <p className="text-muted mb-2  small">{d.date}</p>
                        <div className="text-muted small">
                            {d.content}
                        </div>
                    </li>
            )}
        </ul>
    </div>


};

export default TimelineActivity;
