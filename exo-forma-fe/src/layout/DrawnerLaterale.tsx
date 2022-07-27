import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { useCheckUserMutation } from '../api/userApi'
import { Outlet } from '@tanstack/react-location'

export const drawerWidth = 240

const DrawnerLaterale = () => {
    const [, { data: user }] = useCheckUserMutation({ fixedCacheKey: 'userKey' })

    return (
        <Drawer
            variant={'permanent'}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
        >
            <Outlet />
        </Drawer>
    )
}

export default DrawnerLaterale
