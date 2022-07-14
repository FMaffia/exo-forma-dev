import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FiltriRicercaContainer = () => {
    const [expanded, setExpanded] = React.useState(true)

    const handleChange = () => () => {
        setExpanded(state => !state)
    }
    return (
        <Accordion expanded={expanded} onChange={handleChange()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography variant={'h5'}>Filtri di ricerca</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default FiltriRicercaContainer
