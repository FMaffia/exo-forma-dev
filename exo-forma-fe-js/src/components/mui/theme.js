import {grey, lime, purple} from '@mui/material/colors'
import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: 'Anek Latin!important',
        h6: {
            fontWeight: 'bold',
            color: grey['800']
        }
    },
    palette: {
        background: {
            default: '#E9EEF1'
        },
        primary: {
            main: purple['800'],
            light: purple['900'],
            dark: purple['900']
        },
        secondary: {
            main: lime.A400,
            light: lime.A400,
            dark: '#90cc00'
        }
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        borderLeft: `5px solid ${lime['A400']}`,
                        backgroundColor: '#f1efef',
                        fontWeight: "bold"
                    }
                }
            }
        }
    }
})
export const drawerWidth = 260
