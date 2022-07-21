import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { MenuObject, User } from '../../types/models'
import { Box, Button, Chip, Menu, Stack, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useNavigate } from '@tanstack/react-location'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { generateUserMenuItems } from '../../types/menuItems'

const CustomMenuTypography = styled(Typography)({
    color: grey['800'],
    fontWeight: 600
})
export const MenuUtente = () => {
    // @ts-ignore
    const [anchorEl, setAnchorEl] = (React.useState < null) | (HTMLElement > null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const user: User = useSelector((state: RootState) => state.user)

    const userMenuItems = generateUserMenuItems()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const go = (menu: MenuObject) => {
        setAnchorEl(null)
        navigate({ to: menu.path })
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'right', px: 4 }}>
            <Stack direction="column">
                <Box>
                    <Button
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <CustomMenuTypography variant="button">{user.username}</CustomMenuTypography>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        {userMenuItems.map((menu: MenuObject) => (
                            <MenuItem key={menu.path} onClick={() => go(menu)}>
                                {menu.icon} {menu.menuLabel}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box>
                    {user.permissions?.map(p => (
                        <Chip key={p} size={'small'} component={'div'} clickable label={p} />
                    ))}
                </Box>
            </Stack>
        </Box>
    )
}
