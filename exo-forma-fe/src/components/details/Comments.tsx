import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { END_POINT_LOAD_IMAGE } from '../../services/endpoint/URI_RESOURCES'

export default function Comments() {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={END_POINT_LOAD_IMAGE + '?id=ab.png'} />
                </ListItemAvatar>
                <ListItemText
                    primary="Alberto Ruggeri"
                    secondary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                Ha completato Mines React
                            </Typography>
                            {' — Carino ma troppo semplice'}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={END_POINT_LOAD_IMAGE + '?id=fm.png'} />
                </ListItemAvatar>
                <ListItemText
                    primary="Francesca Maffia"
                    secondary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                Ha completato lo step 4
                            </Typography>
                            {' — 07/08/2022'}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={END_POINT_LOAD_IMAGE + '?id=yq.png'} />
                </ListItemAvatar>
                <ListItemText
                    primary="Yuri Quaglia"
                    secondary={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                Ha completato Mines React
                            </Typography>
                            {' — Carino ma approfondirei la questione x…'}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    )
}
