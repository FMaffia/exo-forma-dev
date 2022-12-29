import React from 'react';
import {useKeycloak} from "@react-keycloak/web";
import useKeyRoles from "../hooks/useKeyRoles";
import Logo from "./Logo";
import {TypographyHeader, TypographyHeaderPre} from "../components/mui/typographyMui";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Key from '@mui/icons-material/Key'
import {UNAUTHORIZED} from "../constants/UserRole";

const Title = ({small, footer}) => {
    const {keycloak} = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%'}}>
            <Logo footer={footer}/>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', mx: 2}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', flexGrow: 1}}>
                    <TypographyHeaderPre variant={small ? 'h5' : 'body1'} noWrap color="secondary">
                        EXO
                    </TypographyHeaderPre>
                    <TypographyHeader variant={small ? 'h5' : 'body1'} noWrap color="white">
                        FORMA
                    </TypographyHeader>
                </Box>
                <Box component={'span'} color={'white'}>
                    <Typography> Repository di progetti utili allo sviluppo e all'apprendimento durante il periodo di
                        stage</Typography>
                </Box>
            </Box>
            {isLoggedIn && role !== UNAUTHORIZED && footer === false && (
                <Box sx={{display: 'flex', justifyContent: "flex-end", paddingRight: 2, flexGrow: 1}}>
                    <Button sx={{color: 'white'}} onClick={() => keycloak.logout()}>
                        <Key sx={{mr: 1}}/> Logout
                    </Button>
                </Box>
            )}
        </Box>
    )
};

export default Title;