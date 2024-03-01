import useKeyRoles from '../hooks/useKeyRoles'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { BASE_PUBLIC_PATH } from './Paths'
import React from 'react'
import TemplateApp from '../layout/TemplateApp'

const appRoutes = role => [
    {
        path: `/`,
        element: <Outlet />,
        children: [
            { index: true, element: <Navigate to={BASE_PUBLIC_PATH} /> },
            {
                path: `/public`,
                element: <TemplateApp />,
                children: [{ index: true, element: <div>HOME</div> }]
            }
        ]
    }
]

const AppRoutes = () => {
    const role = useKeyRoles()
    return useRoutes(appRoutes(role))
}

export default AppRoutes
