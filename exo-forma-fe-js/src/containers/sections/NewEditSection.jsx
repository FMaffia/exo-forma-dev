import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import { drawerWidth } from '../../components/mui/theme'
import EditMenu from '../../components/menus/EditMenu'
import EditBC from '../../components/breadcrumbs/EditBC'
import NewEditContainer from '../newedit/NewEditContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectByIdQuery } from '../../api/projectsApi'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { resetBackupProject } from '../../slices/backupProjectSlice'
import { resetSelectedProject } from '../../slices/projectSlice'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import PublicIcon from '@mui/icons-material/Public'
import { Col, Row } from 'react-bootstrap'

const NewEditSection = () => {
    const reduxProject = useSelector(state => state.currentProject)
    const { data: currentProject, isLoading } = useGetProjectByIdQuery({ id: reduxProject.id, refetchOnMountOrArgChange: true })
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch([resetBackupProject(), resetSelectedProject()])
    }, [])

    const publicProject = () => {
        console.log('public')
    }

    return (
        <div>
            <Drawer
                variant={'permanent'}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                }}
            >
                <EditMenu />
            </Drawer>
            <EditBC />
            <Container className="mb-2">
                <Card className="p-3 bg-primary">
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <h1 className="mb-0 text-white">{reduxProject?.title || 'Nuovo progetto'}</h1>
                            </Col>
                            <Col md={4} className="text-end">
                                <Button size="large" startIcon={<PublicIcon />} variant="contained" color={'secondary'} onClick={() => publicProject()}>
                                    Pubblica
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading ? (
                <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true} onClick={() => null}>
                    <CircularProgress color="secondary" sx={{ mr: 1 }} />
                </Backdrop>
            ) : (
                <NewEditContainer />
            )}
        </div>
    )
}

export default NewEditSection
