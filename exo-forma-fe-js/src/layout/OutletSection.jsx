import React from 'react';
import {Outlet} from "react-router-dom";

const OutletSection = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default OutletSection;