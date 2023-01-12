import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import CalendarMonth from '@mui/icons-material/CalendarMonth'
import { useKeycloak } from '@react-keycloak/web'
import { setPartialProject } from '../../slices/projectSlice'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import UploadCover from './UploadCover'

const DescForm = () => {
    const currentProject = useSelector(state => state.currentProject)
    const { keycloak } = useKeycloak()
    const author = currentProject.author || keycloak.tokenParsed.name
    const dispatch = useDispatch()
    const setPartialProjectInternal = (field, value) => {
        dispatch(setPartialProject({ field, value }))
    }
    return (
        <Card sx={{ p: 5 }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                    <TextField
                        id="input-with-icon-textfield"
                        value={author}
                        label="Autore"
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        value={currentProject?.creationDate}
                        label="Creato il"
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonth />
                                </InputAdornment>
                            )
                        }}
                        variant="standard"
                    />
                </Stack>
                <Box sx={{ height: 200 }}>
                    <UploadCover />
                </Box>

                <TextField
                    id="filled-basic"
                    label="Titolo"
                    variant="standard"
                    onChange={e => setPartialProjectInternal('title', e.target.value)}
                    value={currentProject.title}
                />
                <TextField
                    id="filled-basic"
                    label="Descrizione breve"
                    variant="standard"
                    onChange={e => setPartialProjectInternal('summary', e.target.value)}
                    value={currentProject.summary}
                />
                <TextField
                    value={currentProject.desc}
                    label="Descrizione generale"
                    placeholder="Descrizione generale"
                    variant="standard"
                    multiline
                    onChange={e => setPartialProjectInternal('desc', e.target.value)}
                />
            </Stack>
        </Card>
    )
}

export default DescForm
