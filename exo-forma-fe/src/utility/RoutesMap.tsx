import LoginContainer from '../containers/LoginContainer'
import { Navigate, Route } from '@tanstack/react-location'
import RisultatiRicerca from '../containers/ricerca/RisultatiRicerca'
import DetailsPage from '../pages/DetailsPage'
import EditNewContainer from '../containers/EditNewContainer'
import DetailsStep from '../pages/DetailsStep'

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
                path: 'in-corso',
                element: <RisultatiRicerca />
            },
            {
                path: 'completati',
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
                        children: [
                            {
                                path: '/',
                                element: <DetailsPage />
                            },
                            {
                                path: ':numberStep',
                                element: <DetailsStep />
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
