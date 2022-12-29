import {Box, Chip, Stack, Typography} from '@mui/material'
import {capitalize} from 'lodash'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import CreateIcon from '@mui/icons-material/Create'

const HeaderDetail = ({currentProject}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', padding: 5, color: 'white'}}>
            <Typography variant="h2" sx={{mb: 1}}>
                {capitalize(currentProject?.title)}
            </Typography>
            <Typography variant="subtitle1" component={'div'} sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                    <Box sx={{display: 'flex'}}>
                        <AutoFixHighOutlinedIcon
                            sx={{mr: 2, color: 'white'}}/> {`Creato il ${currentProject?.creationDate}`}
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <CreateIcon sx={{mr: 2, color: 'white'}}/> {`${currentProject?.authors}`}
                    </Box>
                </Box>
            </Typography>
            <Stack direction={'row'} spacing={2} sx={{alignItems: 'center', py: 2}}>
                {currentProject?.categories.map(c => (
                    <Chip key={c} color="secondary" label={`#${c}`} size="medium"/>
                ))}
            </Stack>
        </Box>
    )
};

export default HeaderDetail;