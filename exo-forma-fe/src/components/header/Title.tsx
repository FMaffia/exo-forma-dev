import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, styled } from '@mui/material'
import betaLogo from '../../img/beta.png'
import betaLogoWhite from '../../img/beta_white.png'
import { lime } from '@mui/material/colors'
import { useKeycloak } from '@react-keycloak/web'
import { Key } from '@mui/icons-material'
import useKeyRoles from '../../utility/useKeyRoles'

interface Props {
    small?: boolean;
    footer?: boolean;
}

export const TypographyHeader = styled(Typography)(({ theme }) => ({
    color: lime['A400'],
    fontFamily: 'Quicksand!important',
    fontWeight: 700,
    fontSize: '3rem'
}))
export const TypographyHeaderPre = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontFamily: 'Quicksand!important',
    fontWeight: 700,
    fontSize: '3rem'
}))
export const TypographyHeaderPost = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontFamily: 'Rock Salt!important',
    fontSize: '1.5rem'
}))
export const Logo = ({ footer }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
            <Box component={'img'} src={footer ? betaLogoWhite : betaLogo} sx={{ width: 56, height: 56, margin: '1rem', marginBottom: 0 }} />
            <TypographyHeaderPost color="white">beta</TypographyHeaderPost>
        </Box>
    )
}
export const Title = ({ small, footer }: Props) => {
    const { keycloak } = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%' }}>
            <Logo footer={footer} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mx: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
                    <TypographyHeaderPre variant={small ? 'h5' : 'body1'} noWrap color="secondary">
                        EXO
                    </TypographyHeaderPre>
                    <TypographyHeader variant={small ? 'h5' : 'body1'} noWrap color="white">
                        FORMA
                    </TypographyHeader>
                </Box>
                <Box component={'span'} color={'white'}>
                    <Typography> Repository di progetti utili allo sviluppo e all'apprendimento durante il periodo di stage</Typography>
                </Box>
            </Box>
            {isLoggedIn && role !== 'UNAUTHORIZED' && footer === false && (
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button sx={{ color: 'white' }} onClick={() => keycloak.logout()}>
                        <Key sx={{ mr: 1 }} /> Logout
                    </Button>
                </Box>
            )}
        </Box>
    )
}
