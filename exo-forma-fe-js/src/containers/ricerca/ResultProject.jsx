import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardProject from "../../components/ricerca/CardProject";

const ResultProject = ({projects}) => {

    return (
        <Box
            sx={{
                position: 'relative'
            }}
        >
            <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'left'}}>
                {
                    projects?.map(fp => (
                        <Grid key={fp.id} item xs={12} sm={6} md={4} lg={3} xl={4}>
                            <CardProject project={fp}/>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
};

export default ResultProject;