import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PROJECT_COMPLETATI, PROJECT_EDIT, PROJECT_IN_CORSO, PROJECT_ROOT_NEW } from '../../constants/Routes'
import { purple } from '@mui/material/colors'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, Chip, Fab, Fade, LinearProgress } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { setSelectedProject } from '../../slices/projectSlice'
import { useDispatch } from 'react-redux'

const CardProject = ({ project }) => {
    const fabStyle = {
        position: 'absolute',
        top: 16,
        right: 16
    }
    const prefix = 'data:image/png;base64,'
    const srcImage = prefix + project.image
    const navigate = useNavigate()
    const calculatePerc = project.lastStep > project.stepsCount ? 100 : (project.lastStep * 100) / project.stepsCount
    const location = useLocation()
    const isModifica = location.pathname === PROJECT_EDIT
    const isInCorso = location.pathname === PROJECT_IN_CORSO
    const isCompletati = location.pathname === PROJECT_COMPLETATI
    const completed = project.lastStep > project.stepsCount
    const dispatch = useDispatch()
    const ediProject = project => {
        dispatch(setSelectedProject(project))
        navigate(PROJECT_ROOT_NEW)
    }
    return (
        <Card sx={{ maxWidth: '100%', position: 'relative' }}>
            <CardActionArea
                onClick={() => {
                    navigate('/progetti/' + project.path, { relative: 'path' })
                }}
            >
                <CardHeader sx={{ pt: 2, pb: 0, color: purple['600'] }} title={project.title} />
                <CardContent sx={{ py: 0, justifyContent: 'left' }}>
                    <Typography variant="body1">{`Creato il ${project.creationDate}`}</Typography>
                    <Box sx={{ display: 'flex', color: 'grey' }}>
                        <Typography variant="caption" component={'p'}>
                            {project.authors} | Difficoltà{` ${project.difficult}/3`}{' '}
                        </Typography>
                    </Box>
                    {(isInCorso || isCompletati) && (
                        <Fade timeout={1000} in={true} unmountOnExit>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress
                                        sx={{ height: '0.5rem', borderRadius: '0.3rem' }}
                                        variant="determinate"
                                        value={calculatePerc}
                                        color={completed ? 'secondary' : 'primary'}
                                    />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" color="text.secondary">{`${Math.round(calculatePerc)}%`}</Typography>
                                </Box>
                            </Box>
                        </Fade>
                    )}
                </CardContent>
                <CardContent sx={{ pt: 1, borderBottom: '5px #c6ff00 solid' }}>
                    {project.categories.map(c => (
                        <Chip sx={{ margin: '0.2rem' }} key={c} color="secondary" label={`#${c}`} size="small" />
                    ))}
                </CardContent>
                <CardMedia component="img" height="194" image={srcImage} alt={project.title} />
                <CardContent>
                    <Typography variant="body2">
                        <span className="content" dangerouslySetInnerHTML={{ __html: project.summary }} />
                    </Typography>
                </CardContent>
            </CardActionArea>
            {isModifica && (
                <Fade timeout={1000} in={true} unmountOnExit>
                    <Fab
                        sx={fabStyle}
                        color="secondary"
                        size={'small'}
                        title={'Modifica progetto'}
                        aria-label="Modifica progetto"
                        onClick={() => ediProject(project)}
                    >
                        <ModeEditIcon />
                    </Fab>
                </Fade>
            )}
        </Card>
    )
}

export default CardProject;