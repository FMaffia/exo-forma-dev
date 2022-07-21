import React from 'react'
import { Box, CardActionArea, Grid, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import { Project } from '../../types/models'
import CardProjectViewer from './CardProjectViewer'

interface ICardProps {
    title: string;
    subtitle: string;
    icon: any;
    click: () => void;
    compact: boolean;
    list: Project[];
}

const EsploraProgettiCard = ({ title, subtitle, icon, click, compact, list }: ICardProps) => {
    return (
        <Card
            sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderLeft: theme => `${theme.spacing(1)} solid ${theme.palette.secondary.main}`
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <CardActionArea onClick={click}>
                        <Typography component="div" variant="h5" color={'primary'}>
                            {title}
                        </Typography>
                    </CardActionArea>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {subtitle}
                    </Typography>
                    {compact ? (
                        <List>
                            {list.map(e => (
                                <ListItem key={e.id} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AccountTreeOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={e.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'left' }}>
                            <CardProjectViewer list={list} />
                        </Grid>
                    )}
                </CardContent>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'stretch',
                    px: 4,
                    background: 'linear-gradient(180deg, rgba(124,42,175,1) 0%, rgba(74,20,140,1) 92%)'
                }}
            >
                {icon}
            </Box>
        </Card>
    )
}

export default EsploraProgettiCard
