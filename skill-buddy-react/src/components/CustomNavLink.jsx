import React from 'react';
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";

const CustomNavLink = ({menuItem, extraProps}) => {
    const location = useLocation()
    const currentPath = location.pathname
    return <Link className={clsx(menuItem.isActive(currentPath) && "active", "nav-link")} to={menuItem.path} {...extraProps}>
        <span className={menuItem.icon}/>
        {menuItem.label}
        {menuItem.hasChildren() && <i className="bi bi-chevron-down ms-auto"/>}
    </Link>
};

export default CustomNavLink;
