import {lime} from "@mui/material/colors";
import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";

export const TypographyHeader = styled(Typography)(({theme}) => ({
    color: lime['A400'],
    fontFamily: 'Quicksand!important',
    fontWeight: 700,
    fontSize: '3rem'
}))
export const TypographyHeaderPre = styled(Typography)(({theme}) => ({
    color: 'white',
    fontFamily: 'Quicksand!important',
    fontWeight: 700,
    fontSize: '3rem'
}))
export const TypographyHeaderPost = styled(Typography)(({theme}) => ({
    color: 'white',
    fontFamily: 'Rock Salt!important',
    fontSize: '1.5rem'
}))