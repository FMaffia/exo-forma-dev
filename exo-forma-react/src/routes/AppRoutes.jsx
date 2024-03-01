import {Navigate, useNavigate, useRoutes} from "react-router-dom";
import {BASE_PUBLIC_PATH, LOGOUT_PAGE, UNAUTHORIZED_PAGE} from "../constants/Paths";
import LogoutPage from "../pages/LogoutPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import {useEffect} from "react";
import * as UserRoles from "../constants/UserRole";
import {useKeycloak} from "@react-keycloak/web";
import useKeyRoles from "../hooks/useKeyRoles";
import Template from "../template/Template";

const appRoutes = (role) => [
    {
        path: `/`,
        element: <Template/>,
        children: [
            {index: true, element: <Navigate to={BASE_PUBLIC_PATH}/>},
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
                element: <div>ELEMENTO PUBBLICO
                </div>,
                children: [{index: true, element: <div>HOME</div>}]
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
