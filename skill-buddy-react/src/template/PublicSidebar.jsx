import React from 'react';
import {PUBLIC_DASHBOARD, PUBLIC_PROJECTS_COMPLETATI, PUBLIC_PROJECTS_IN_CORSO, PUBLIC_PROJECTS_SFOGLIA} from "../constants/Paths";

import {MenuItem} from "../models/Menu";
import CustomNavLink from "../components/CustomNavLink";

export const publicVoices = [
    new MenuItem(0, "La mia dashboard", PUBLIC_DASHBOARD, "bi bi-columns-gap me-2"),
    new MenuItem(1, "SkillBuddy", PUBLIC_PROJECTS_SFOGLIA, "bi bi-feather me-2", [
        new MenuItem("1a", "Tic Tac Toe", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1a", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1a", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),

    ]),
    new MenuItem(2, "Progetti in corso", PUBLIC_PROJECTS_IN_CORSO, "bi bi bi-hourglass me-2",
        [
            new MenuItem("1a", "Tic Tac Toe", PUBLIC_PROJECTS_SFOGLIA),
            new MenuItem("1a", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
            new MenuItem("1a", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),

        ]
    ),
    new MenuItem(3, "Progetti completati", PUBLIC_PROJECTS_COMPLETATI, "bi bi-flag me-2", [
        new MenuItem("1a", "Tic Tac Toe", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1a", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1a", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),

    ]),
]

const PublicSidebar = () => {
    return <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            {publicVoices.map(menuItem =>
                <li key={menuItem.id} className="nav-item">
                    {menuItem.hasChildren() ?
                        <>
                            <CustomNavLink menuItem={menuItem} extraProps={{
                                className: "nav-link collapsed", "data-bs-target": "#nav-" + menuItem.id, "data-bs-toggle": "collapse", href: "#"
                            }}/>
                            <ul id={"nav-" + menuItem.id} className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                {menuItem.children.map(subMenuItem =>
                                    <li key={subMenuItem.id}>
                                        <CustomNavLink menuItem={subMenuItem}/>
                                    </li>
                                )}
                            </ul>
                        </>
                        : <CustomNavLink menuItem={menuItem}/>}
                </li>)
            }
        </ul>
    </aside>
};

export default PublicSidebar;
