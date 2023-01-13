import React from 'react'
import { theme } from '../components/mui/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Box from '@mui/material/Box'
import { ContainerFooter, ContainerHeader, ContainerMain } from '../components/mui/containersMui'
import Title from './Title'
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

const PrivateLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <ContainerHeader maxWidth={false}>
                <Title footer={false} />
            </ContainerHeader>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <ContainerMain maxWidth={false}>
                    <Routes>
                        <Route path="" element={<Navigate to={'progetti'} />} />
                        <Route path="progetti" element={<OutletSection />}>
                            <Route index element={<ProgettiSection />} />
                            <Route path="in-corso" element={<ProgettiSection />} />
                            <Route path="in-bozza" element={<ProgettiSection />} />
                            <Route path="completati" element={<ProgettiSection />} />
                            <Route path="modifica" element={<ProgettiSection />} />
                            <Route path="edita" element={<NewEditSection />}>
                                <Route index element={<DescForm />} />
                                <Route path="caratteristiche" element={<FeatureForm />} />
                                <Route path="step" element={<OutletSection />}>
                                    <Route index element={<Navigate to={'edita'} />} />
                                    <Route path=":stepEdit" element={<StepForm />} />
                                </Route>
                            </Route>
                            <Route path=":projectPath" element={<OutletSection />}>
                                <Route index element={<DettaglioSection />} />
                                <Route path="step" element={<OutletSection />}>
                                    <Route index element={<Navigate to={'../../../progetti'} />} />
                                    <Route path=":numberStep" element={<StepSection />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </ContainerMain>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true} />
            </ContainerFooter>
        </ThemeProvider>
    )
}

export default PrivateLayout
