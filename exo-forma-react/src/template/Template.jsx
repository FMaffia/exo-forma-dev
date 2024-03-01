import React from 'react';
import {Outlet} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const Template = () => {
    const {keycloak} = useKeycloak()
    const logout = () => {
        keycloak.logout()
    }
    return (
        <div>
            TEMPLATE
            <Outlet/>
            <button onClick={logout}> LOGOUT</button>
        </div>
    );
};

export default Template;
