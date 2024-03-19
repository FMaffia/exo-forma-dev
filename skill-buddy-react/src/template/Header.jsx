import React, {useEffect, useRef, useState} from 'react';
import logo from "../assets/img/logo.png"
import profile from "../assets/img/profile-img.jpg"
import logoExolab from "../assets/img/exolab-logo.png"

const Header = () => {
    const bodyRef = useRef()
    useEffect(() => {
        bodyRef.current = document.getElementsByTagName('body')[0]
    }, [])
    const [hide, setHide] = useState(false)

    const onClick = () => {
        setHide(!hide)
    }
    useEffect(() => {
        bodyRef.current.className = hide ? "toggle-sidebar" : ""
    }, [hide])
    return <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center">
                <img src={logo} alt=""/>
                <div>
                    <span className="d-none d-lg-block">SkillBuddy </span>
                </div>
            </a>
            <i className="bi bi-list toggle-sidebar-btn" onClick={onClick}></i>
        </div>
        <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
        </div>

        <nav className="header-nav ms-auto d-flex">
             <span className="d-none d-lg-block me-5 text-muted">
                     <img style={{filter: "brightness(0.8)"}} src={logoExolab} height={50}/>
                    </span>

            <ul className="d-flex align-items-center">
                <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="#">
                        <i className="bi bi-search"></i>
                    </a>
                </li>

                <li className="nav-item dropdown">

                    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-bell"></i>
                        <sup>
                            <span className="badge bg-primary badge-number">4</span>
                        </sup>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                        <li className="dropdown-header">
                            You have 4 new notifications
                            <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                    </ul>

                </li>

                <li className="nav-item dropdown pe-3">
                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                        <img src={profile} alt="Profile" className="rounded-circle" width={40}/>
                        <span className="d-none d-md-block dropdown-toggle ps-2">Nicola Santocchi</span>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li className="dropdown-header">
                            <h6>Kevin Anderson</h6>
                            <span>Web Designer</span>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                <i className="bi bi-person"></i>
                                <span>My Profile</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                <i className="bi bi-gear"></i>
                                <span>Account Settings</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                <i className="bi bi-question-circle"></i>
                                <span>Need Help?</span>
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>

                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Sign Out</span>
                            </a>
                        </li>

                    </ul>
                </li>

            </ul>
        </nav>
    </header>
}

export default Header;