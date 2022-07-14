import React from 'react'
import { Project } from '../../model/models'
import { Box, CardActionArea, Grid, LinearProgress } from '@mui/material'
import { PROJECT_ROOT } from '../../utility/Routes'
import CardHeader from '@mui/material/CardHeader'
import { purple } from '@mui/material/colors'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { END_POINT_LOAD_IMAGE } from '../../services/endpoint/URI_RESOURCES'
import Card from '@mui/material/Card'
import { useNavigate } from '@tanstack/react-location'

interface ICardProps {
    list: Project[];
}

const CardProjectViewer = ({ list }: ICardProps) => {
    const navigate = useNavigate()

    return (
        <>
            {list.map(project => {
                const calculatePerc = project.lastStep ? (project.lastStep * 100) / project.stepsCount : undefined
                const completed: boolean = project.lastStep === project.stepsCount

                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={4}>
                        <Card sx={{ maxWidth: '100%', position: 'relative' }}>
                            <CardActionArea
                                onClick={() => {
                                    navigate({ to: PROJECT_ROOT + project.path })
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
                                <CardMedia component="img" height="194" image={END_POINT_LOAD_IMAGE + '?id=' + project.id + '.jpg'} alt={project.title} />
                                <CardContent>
                                    <Typography variant="body2">
                                        <span className="content" dangerouslySetInnerHTML={{ __html: project.descBreve }} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )
}

export default CardProjectViewer
