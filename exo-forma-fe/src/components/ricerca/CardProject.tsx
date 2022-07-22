import React from 'react'
import { Project } from '../../types/models'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, Chip, Fab, Fade, LinearProgress } from '@mui/material'
import { useLocation, useNavigate } from '@tanstack/react-location'
import { PROJECT_EDIT } from '../../utility/Routes'
import { END_POINT_LOAD_IMAGE } from '../../services/endpoint/URI_RESOURCES'
import { purple } from '@mui/material/colors'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { includes } from 'lodash'
import { useCheckUserMutation } from '../../api/userApi'

interface Prop {
    project: Project;
}

const fabStyle = {
    position: 'absolute',
    top: 16,
    right: 16
}
const CardProject = ({ project }: Prop) => {
    const navigate = useNavigate()

    const calculatePerc = project.lastStep ? (project.lastStep * 100) / project.stepsCount : undefined
    const location = useLocation()
    const isModifica = location.history.location.pathname === PROJECT_EDIT
    const [, { data: user }] = useCheckUserMutation({ fixedCacheKey: 'userKey' })
    const permissions: string[] | undefined = user?.permissions
    const completed: boolean = project.lastStep === project.stepsCount

    return (
        <Card sx={{ maxWidth: '100%', position: 'relative' }}>
            <CardActionArea
                onClick={() => {
                    navigate({ to: `./dettaglio/${project.path}` })
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

                    {calculatePerc && (
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
                    )}
                </CardContent>
                <CardContent sx={{ pt: 1, borderBottom: '5px #c6ff00 solid' }}>
                    {project.categories.map(c => (
                        <Chip sx={{ margin: '0.2rem' }} key={c} color="secondary" label={`#${c}`} size="small" />
                    ))}
                </CardContent>
                <CardMedia component="img" height="194" image={END_POINT_LOAD_IMAGE + '?id=' + project.id + '.jpg'} alt={project.title} />
                <CardContent>
                    <Typography variant="body2">
                        <span className="content" dangerouslySetInnerHTML={{ __html: project.descBreve }} />
                    </Typography>
                </CardContent>
            </CardActionArea>
            {includes(permissions, 'WRITE') && isModifica && (
                <Fade timeout={1000} in={true} unmountOnExit>
                    <Fab
                        sx={fabStyle}
                        color="secondary"
                        size={'small'}
                        title={'Modifica progetto'}
                        aria-label="Modifica progetto"
                        onClick={() => navigate({ to: PROJECT_EDIT + `${project.path}` })}
                    >
                        <ModeEditIcon />
                    </Fab>
                </Fade>
            )}
        </Card>
    )
}

export default CardProject
