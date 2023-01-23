import React from 'react'
import { AccordionDetails, AccordionSummary, Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CustomAccordion, CustomTitleAccordion } from '../../components/mui/accordion'
import Typography from '@mui/material/Typography'

const BodyDetailOLD = ({ currentProject }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <CustomAccordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color={'primary'} />} aria-controls="panel1a-content" id="panel1a-header">
                        <CustomTitleAccordion variant={'button'}>Descrizione </CustomTitleAccordion>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{currentProject.desc}</Typography>
                    </AccordionDetails>
                </CustomAccordion>
            </Grid>
            <Grid item xs={4}>
                <CustomAccordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color={'primary'} />} aria-controls="panel1a-content" id="panel1a-header">
                        <CustomTitleAccordion variant={'button'}>Altre info </CustomTitleAccordion>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Altre info</Typography>
                    </AccordionDetails>
                </CustomAccordion>
            </Grid>
        </Grid>
    )
}

export default BodyDetailOLD
