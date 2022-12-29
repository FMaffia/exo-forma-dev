import {Box, Typography} from '@mui/material'
import {grey, purple} from '@mui/material/colors'
import CircularProgressStatic from './CircularProgress'

const StepIndicator = ({currentProject}) => {
    const calculatePerc = currentProject?.lastStep ? ((currentProject?.lastStep - 1) * 100) / currentProject.stepsCount : undefined
    return (
        <>
            <Typography sx={{p: 2, fontWeight: 600}} variant={'button'} color={'inherit'}>
                <span style={{color: purple[800]}}>Percentuale avanzamento</span>
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', p: 2, pb: 0}}>
                <CircularProgressStatic size="8rem" value={calculatePerc === undefined ? 0 : calculatePerc}/>
            </Box>
            <Typography
                sx={{
                    p: 2,
                    fontWeight: 600,
                    pt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    color: grey['400'],
                    justifyContent: 'center'
                }}
                variant={'button'}
                color={'inherit'}
            >
                {/*@ts-ignore*/}
                {`Steps completati ${currentProject?.lastStep - 1}/${currentProject?.stepsCount}`}
            </Typography>
        </>
    )
};

export default StepIndicator;