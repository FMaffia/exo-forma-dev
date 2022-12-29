import React from 'react';
import {Box, ThemeProvider} from "@mui/material";
import {theme} from "../components/mui/theme";
import {ContainerFooter, ContainerHeader, ContainerMain} from "../components/mui/containersMui";
import Title from "./Title";

const PublicLayout = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <ContainerHeader maxWidth={false}>
                <Title footer={false}/>
            </ContainerHeader>
            <Box sx={{display: 'flex'}}>
                <ContainerMain maxWidth={false}>{children}</ContainerMain>
            </Box>
            <ContainerFooter maxWidth={false}>
                <Title footer={true}/>
            </ContainerFooter>
        </ThemeProvider>
    )
};

export default PublicLayout;