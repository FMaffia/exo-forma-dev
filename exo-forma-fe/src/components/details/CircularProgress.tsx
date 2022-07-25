import * as React from 'react'
import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'

const CircularProgressStatic = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress color={'primary'} variant="determinate" {...props} />
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
                <Typography sx={{ p: 2, fontWeight: 600 }} variant={'button'} color={'inherit'}>
                    <span style={{ color: purple[600] }}>{`${Math.round(props.value)}%`}</span>
                </Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressStatic
