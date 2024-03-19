import {Navigate, Outlet, useNavigate, useRoutes} from "react-router-dom";
import {
    BASE_PUBLIC_PATH,
    LOGOUT_PAGE,
    PUBLIC_DASHBOARD,
    PUBLIC_PROJECTS,
    PUBLIC_PROJECTS_COMPLETATI,
    PUBLIC_PROJECTS_IN_CORSO,
    PUBLIC_PROJECTS_SFOGLIA,
    UNAUTHORIZED_PAGE
} from "../constants/Paths";
import LogoutPage from "../pages/LogoutPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import {useEffect} from "react";
import * as UserRoles from "../constants/UserRole";
import {useKeycloak} from "@react-keycloak/web";
import useKeyRoles from "../hooks/useKeyRoles";
import TemplateHome from "../template/TemplateHome";
import DashboardContainer from "../containers/DashboardContainer";
import ProgettiContainer from "../containers/ProgettiContainer";
import ProgInCorso from "../containers/progetti/ProgInCorso";
import ProgCompletati from "../containers/progetti/ProgCompletati";

const appRoutes = (role) => [
    {
        path: `/`,
        element: <TemplateHome/>,
        children: [
            {index: true, element: <Navigate to={BASE_PUBLIC_PATH}/>},
            {
                path: "/skillbuddy",
                element: <Navigate to={BASE_PUBLIC_PATH}/>
            },
            {
                path: LOGOUT_PAGE,
                element: <LogoutPage/>
            },
            {
                path: UNAUTHORIZED_PAGE,
                element: <UnauthorizedPage/>
            },
            {
                path: BASE_PUBLIC_PATH,
                element: <Outlet/>,
                children: [
                    {index: true, element: <Navigate to={PUBLIC_DASHBOARD}/>},
                    {path: PUBLIC_DASHBOARD, element: <DashboardContainer/>},
                    {path: PUBLIC_PROJECTS, element: <Navigate to={PUBLIC_PROJECTS_SFOGLIA}/>},
                    {path: PUBLIC_PROJECTS_SFOGLIA, element: <ProgettiContainer/>},
                    {path: PUBLIC_PROJECTS_IN_CORSO, element: <ProgInCorso/>},
                    {path: PUBLIC_PROJECTS_COMPLETATI, element: <ProgCompletati/>},
                ]
            }
        ]
    }
]

export const AppRoutes = () => {
    const {keycloak} = useKeycloak()
    const role = useKeyRoles()
    const navigate = useNavigate()
    const isLoggedIn = keycloak.authenticated
    useEffect(() => {
        if (isLoggedIn) {
            if (role === UserRoles.UNAUTHORIZED) {
                navigate(UNAUTHORIZED_PAGE)
            }
        } else {
            navigate(LOGOUT_PAGE)
        }
    }, [isLoggedIn])
    return useRoutes(appRoutes(role))

}
