import React from 'react';
import {useParams} from "react-router-dom";

const DetailsStep = () => {
    let {numberStep} = useParams();

    return (
        <div>
            {numberStep}
        </div>
    );
};

export default DetailsStep;