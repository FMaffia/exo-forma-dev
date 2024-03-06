import React from 'react';
import logoExolab from "../assets/img/exolab-logo.png"

const Footer = () => {
    return <footer id="footer" className="footer d-flex p-4 align-items-center bg-dark">
        <div className="footer-img p-2">
            <img src={logoExolab} height={50}/>
        </div>
        <div className="text-white p-2">
            &copy; Copyright <strong><span className={"fw-bold text-warning"}>SkillBuddy Web </span></strong><br/>
            <small> All Rights Reserved Created by Exolab s.r.l.
                <br/>Versione Beta 2024.</small>
        </div>
    </footer>
};

export default Footer;
