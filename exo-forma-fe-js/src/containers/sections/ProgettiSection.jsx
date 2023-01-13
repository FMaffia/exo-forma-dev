import React, { useEffect, useState } from 'react'
import HomeMenu from '../../components/menus/HomeMenu'
import Drawer from '@mui/material/Drawer'
import { drawerWidth } from '../../components/mui/theme'
import ProjectsBC from '../../components/breadcrumbs/ProjectsBC'
import Skeleton from 'react-loading-skeleton'
import ResultProject from '../ricerca/ResultProject'
import { useGetProjectsQuery } from '../../api/projectsApi'
import { MenuFilter } from '../../models/menuItems'

const ProgettiSection = () => {
    const [filter, setFilter] = useState()
    const { data, isLoading } = useGetProjectsQuery({ refetchOnMountOrArgChange: true })
    const [filteredProjects, setFilteredProjects] = useState(data)

    useEffect(() => {
        filtra()
    }, [filter, data])

    const filtra = () => {
        if (filter === MenuFilter.COMPLETATI) {
            let x = data.filter(p => p.lastStep > p.stepsCount)
            setFilteredProjects(x)
            return
        }
        if (filter === MenuFilter.IN_CORSO) {
            let y = data.filter(p => p.lastStep > 0 && p.lastStep < p.stepsCount)
            setFilteredProjects(y)
            return
        }
        setFilteredProjects(data)
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
                <HomeMenu filter={filter} setFilter={setFilter} />
            </Drawer>
            <ProjectsBC filter={filter} setFilter={setFilter} />
            {isLoading ? <Skeleton count={20} /> : <ResultProject projects={filteredProjects} />}
        </div>
    )
}

export default ProgettiSection;