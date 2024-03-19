import React from 'react';
import {useKeycloak} from "@react-keycloak/web";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const TemplateHome = () => {
    const {keycloak} = useKeycloak()
    const logout = () => {
        keycloak.logout()
    }
    return <div id="wrapper">
        <Header/>
        <Sidebar/>
        <main id="main" className={"main"}>
            <Outlet/>
        </main>
        <Footer/>
    </div>
};

export default TemplateHome;
