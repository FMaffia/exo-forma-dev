import React from 'react';
import {useParams} from "react-router-dom";

const StepForm = () => {
    const {stepEdit} = useParams()
    return (
        <div>
            {stepEdit}
        </div>
    );
};

export default StepForm;