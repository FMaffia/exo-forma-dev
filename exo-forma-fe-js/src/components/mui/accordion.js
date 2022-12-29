import {Accordion, styled, Typography} from "@mui/material";
import {purple} from '@mui/material/colors'

export const CustomAccordion = styled(Accordion)(() => ({
    borderBottom: '3px #c6ff00 solid'
}))
export const CustomTitleAccordion = styled(Typography)(({theme}) => ({
    fontWeight: 600,
    color: purple['800']
}))
