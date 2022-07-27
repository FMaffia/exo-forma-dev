import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CustomTitleAccordion } from '../../layout/CustomMui'
import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { useGetDetailsQuery } from '../../api/projectsApi'
import { useMatch } from '@tanstack/react-location'

const CustomAccordion = styled(Accordion)(() => ({
    borderBottom: '3px #c6ff00 solid'
}))
const BodyDetails = () => {
    const {
        params: { projectPath }
    } = useMatch()
    const { data: currentProject, isLoading } = useGetDetailsQuery(projectPath)

    return (
        <div>
            <CustomAccordion expanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon color={'primary'} />} aria-controls="panel1a-content" id="panel1a-header">
                    <CustomTitleAccordion variant={'button'}>Descrizione </CustomTitleAccordion>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{currentProject && <span className="content" dangerouslySetInnerHTML={{ __html: currentProject.desc }} />}</Typography>
                </AccordionDetails>
            </CustomAccordion>
            <CustomAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon color={'primary'} />} aria-controls="panel2a-content" id="panel2a-header">
                    <CustomTitleAccordion variant={'button'}>Links & Files </CustomTitleAccordion>
                </AccordionSummary>
                <AccordionDetails>
                    {[0, 1, 2, 3].map(value => (
                        <ListItemButton key={value} component="a" href="#simple-list">
                            <ListItemIcon
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    marginRight: '1rem'
                                }}
                            >
                                <LaunchIcon color={'primary'} />
                            </ListItemIcon>
                            <ListItemText primary={`https://mui.com/material-ui/react-list/#basic-list  ${value + 1}`} />
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </CustomAccordion>
        </div>
    )
}

export default BodyDetails
