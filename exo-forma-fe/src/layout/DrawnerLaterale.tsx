import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useCheckUserMutation } from '../api/userApi'
import { Outlet } from '@tanstack/react-location'

const drawerWidth = 240

const DrawnerLaterale = () => {
    const [, { data: user }] = useCheckUserMutation({ fixedCacheKey: 'userKey' })
    return (
        <Drawer
            variant="permanent"
            sx={{
                position: 'inherit!important',
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
        >
            <Box sx={{ height: '100vh!important', width: drawerWidth, overflow: 'auto', position: 'inherit!important' }}>
                {/*<HomeMenu />*/}
                {/*<StepMenu />*/}
                <Outlet />
            </Box>
        </Drawer>
    )
}

export default DrawnerLaterale
