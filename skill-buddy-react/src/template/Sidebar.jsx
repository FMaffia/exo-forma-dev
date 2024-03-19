import React, {useEffect, useState} from 'react';
import {
    ATTESA_PUBBLICAZIONE,
    BASE_EDITOR_PATH,
    CREA_NUOVO,
    LE_MIE_PUBBLICAZIONI,
    PUBLIC_DASHBOARD,
    PUBLIC_PROJECTS_COMPLETATI,
    PUBLIC_PROJECTS_IN_CORSO,
    PUBLIC_PROJECTS_SFOGLIA,
    STATISTICHE
} from "../constants/Paths";

import {MenuItem} from "../models/Menu";
import CustomNavLink from "../components/CustomNavLink";
import useKeyRoles from "../hooks/useKeyRoles";
import {cloneDeep} from "lodash/lang";
import {ADMIN_ROLE, EDITOR_ROLE} from "../constants/Constants";
import {concat} from "lodash/array";

export const publicVoices = [
    new MenuItem(0, "La mia dashboard", PUBLIC_DASHBOARD, "bi bi-columns-gap me-2"),
    new MenuItem(1, "SkillBuddy", PUBLIC_PROJECTS_SFOGLIA, "bi bi-feather me-2", [
        new MenuItem("1a", "Tic Tac Toe", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1b", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("1c", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),
    ]),
    new MenuItem(2, "Progetti in corso", PUBLIC_PROJECTS_IN_CORSO, "bi bi bi-hourglass me-2",
        [
            new MenuItem("2a", "Tic Tac Toe", PUBLIC_PROJECTS_IN_CORSO),
            new MenuItem("2b", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
            new MenuItem("2c", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),

        ]
    ),
    new MenuItem(3, "Progetti completati", PUBLIC_PROJECTS_COMPLETATI, "bi bi-flag me-2", [
        new MenuItem("3a", "Tic Tac Toe", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("3b", "Tic Tac Toe 2", PUBLIC_PROJECTS_SFOGLIA),
        new MenuItem("3c", "Tic Tac Toe 3", PUBLIC_PROJECTS_SFOGLIA),
    ]),
]
export const pubblicazioniVoices = [
    new MenuItem(4, "Pubblicazioni", BASE_EDITOR_PATH, "bi bi-pen me-2", [
        new MenuItem("4a", "Le mie pubblicazioni", LE_MIE_PUBBLICAZIONI),
        new MenuItem("4b", "In attesa", ATTESA_PUBBLICAZIONE),
        new MenuItem("4c", "Crea nuova", CREA_NUOVO),
    ])
]
export const adminVoices = [
    new MenuItem(5, "Statistiche utenti", STATISTICHE, "bi bi-columns-gap me-2"),
    pubblicazioniVoices
]

const Sidebar = () => {
    const role = useKeyRoles()
    const [baseVoices, setBaseVoices] = useState([])
    useEffect(() => {
        if (role === EDITOR_ROLE) {
            let internalArray = cloneDeep(baseVoices)
            setBaseVoices(concat(internalArray, pubblicazioniVoices))
        } else if (role === ADMIN_ROLE) {
            setBaseVoices(adminVoices)
        }
    }, [role])

    return <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            {baseVoices.map(menuItem =>
                <li key={menuItem.id} className="nav-item">
                    {menuItem?.hasChildren() ?
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

export default Sidebar;
