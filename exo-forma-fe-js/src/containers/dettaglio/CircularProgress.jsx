import {Box, CircularProgress, Typography} from '@mui/material'
import {purple} from '@mui/material/colors'

const CircularProgressStatic = ({value, size}) => {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress color={'primary'} variant="determinate" value={value} size={size}/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography sx={{p: 2, fontWeight: 600}} variant={'button'} color={'inherit'}>
                    <span style={{color: purple[600]}}>{`${Math.round(value)}%`}</span>
                </Typography>
            </Box>
        </Box>
    )
};

export default CircularProgressStatic;