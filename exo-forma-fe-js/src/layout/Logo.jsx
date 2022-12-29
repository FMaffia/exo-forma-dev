import React from 'react';
import Box from "@mui/material/Box";
import betaLogoWhite from '../img/leaf-white.png'
import {TypographyHeaderPost} from "../components/mui/typographyMui";

const Logo = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2}}>
            <Box component={'img'} src={betaLogoWhite}
                 sx={{width: 56, height: 56, margin: '1rem', marginBottom: 0}}/>
            <TypographyHeaderPost color="white">beta</TypographyHeaderPost>
        </Box>
    )
};

export default Logo;