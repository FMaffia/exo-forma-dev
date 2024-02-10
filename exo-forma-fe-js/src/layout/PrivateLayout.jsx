import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Page404 from '../pages/Page404'
import ProgettiSection from '../containers/sections/ProgettiSection'
import DettaglioSection from '../containers/sections/DettaglioSection'
import OutletSection from './OutletSection'
import StepSection from '../containers/sections/StepSection'
import NewEditSection from '../containers/sections/NewEditSection'
import FeatureForm from '../containers/newedit/FeatureForm'
import DescForm from '../containers/newedit/DescForm'
import StepForm from '../containers/newedit/StepForm'
import { Container } from 'react-bootstrap'
import ContainerHeader from './ContainerHeader'
import MenuApp from './MenuApp'
import { GESTIONE_ROOT, MATERIALI_ROOT, PROJECT_COMPLETATI, PROJECT_EDIT, PROJECT_IN_CORSO, PROJECT_ROOT } from '../constants/Routes'
import GestioneSection from '../containers/sections/GestioneSection'
import MaterialiSection from '../containers/sections/MaterialiSection'

const PrivateLayout = () => {
    return (
        <div>
            <ContainerHeader footer={false} />
            <MenuApp />
            <Container fluid style={{ minHeight: '80vh' }}>
                <Routes>
                    <Route path="" element={<Navigate to={'/exoforma-fe/'} />} />
                    <Route path="/exoforma-fe/" element={<Navigate to={'/exoforma-fe/progetti'} />} />
                    <Route path={PROJECT_ROOT} element={<OutletSection />}>
                        <Route index element={<ProgettiSection />} />
                        <Route path={PROJECT_IN_CORSO} element={<ProgettiSection />} />
                        <Route path={PROJECT_COMPLETATI} element={<ProgettiSection />} />
                        <Route path=":projectPath" element={<OutletSection />}>
                            <Route index element={<DettaglioSection />} />
                            <Route path="step" element={<OutletSection />}>
                                <Route index element={<Navigate to={'../../../progetti'} />} />
                                <Route path=":numberStep" element={<StepSection />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path={GESTIONE_ROOT} element={<OutletSection />}>
                        <Route path={PROJECT_EDIT} element={<GestioneSection />} />
                        <Route path="edita" element={<NewEditSection />}>
                            <Route index element={<DescForm />} />
                            <Route path="caratteristiche" element={<FeatureForm />} />
                            <Route path="step" element={<OutletSection />}>
                                <Route index element={<Navigate to={'edita'} />} />
                                <Route path=":stepEdit" element={<StepForm />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path={MATERIALI_ROOT} element={<OutletSection />}>
                        <Route path={MATERIALI_ROOT} element={<MaterialiSection />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Container>
            <ContainerHeader footer />
        </div>
    )
}

export default PrivateLayout
