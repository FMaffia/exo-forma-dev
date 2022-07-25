import LoginContainer from '../containers/LoginContainer'
import { Navigate, ReactLocation, Route } from '@tanstack/react-location'
import RisultatiRicerca from '../containers/ricerca/RisultatiRicerca'
import DetailsPage from '../pages/DetailsPage'
import EditNewContainer from '../containers/EditNewContainer'
import HomeMenu from '../components/menus/HomeMenu'
import DetailsMenu from '../components/menus/DetailsMenu'
import BodyDetails from '../components/details/BodyDetails'

export const location = new ReactLocation()

export const privateRoutes: Route[] = [
    {
        path: '/',
        element: <Navigate to={'/progetti'} />
    },
    {
        path: 'progetti',
        children: [
            {
                path: '/',
                element: <RisultatiRicerca />
            },
            {
                path: 'bozze',
                element: <RisultatiRicerca />
            },

            {
                path: 'dettaglio',
                children: [
                    {
                        path: '/',
                        element: <Navigate to="/progetti" />
                    },
                    {
                        path: ':projectPath',
                        element: <DetailsPage />,
                        children: [
                            {
                                path: '/',
                                element: <BodyDetails />
                            },
                            {
                                path: ':numberStep',
                                element: <p>Step details</p>
                            }
                        ]
                    }
                ]
            },
            {
                path: 'modifica',
                children: [
                    {
                        path: '/',
                        element: <RisultatiRicerca />
                    },
                    {
                        path: ':projectPath',
                        element: <EditNewContainer />
                    }
                ]
            },
            {
                path: 'nuovo',
                element: <EditNewContainer />
            }
        ]
    },
    {
        path: '*',
        element: <p>Nessuna pagina trovata</p>
    }
]

export const publicRoutes = [
    {
        path: '/',
        element: <Navigate to={'/login'} />
    },
    {
        path: 'login',
        element: <LoginContainer />
    }
]

export const menuRoutes = [
    {
        path: '/progetti',
        children: [
            {
                path: '/',
                element: <HomeMenu />
            },
            {
                path: '/dettaglio/:projectPath',
                element: <DetailsMenu />
            },
            {
                path: '*',
                element: <HomeMenu />
            }
        ]
    }
]
