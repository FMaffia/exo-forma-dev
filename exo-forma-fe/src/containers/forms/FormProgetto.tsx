import React, { useEffect } from 'react'
import { FormProps } from '../../model/models'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import 'moment/locale/it'

const FormProgetto = ({ currentProject, setField }: FormProps) => {
    const categories: string[] = []
    useEffect(() => {
        if (currentProject.creationDate === '' || currentProject.creationDate === undefined) {
            setField('creationDate', moment().format('DD/MM/yyyy'))
        }
    }, [currentProject.creationDate])
    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                width: '80%'
            }}
        >
            <div>
                <TextField
                    sx={{
                        width: '60%'
                    }}
                    id="titolo-progetto"
                    label="Titolo progetto"
                    variant="outlined"
                    value={currentProject.title}
                    onChange={e => setField('title', e.target.value)}
                />
            </div>
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Autore</InputLabel>
                    <Select
                        sx={{
                            mr: 2,
                            width: '30ch'
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentProject.authors}
                        label="Autore"
                        onChange={e => setField('authors', e.target.value)}
                    >
                        <MenuItem value={'Edo Galizia'}>Edo Galizia</MenuItem>
                        <MenuItem value={'Valentin Puscasu'}>Valentin Puscasu</MenuItem>
                        <MenuItem value={'Yuri Quaglia'}>Yuri Quaglia</MenuItem>
                        <MenuItem value={'Alberto Ruggeri'}>Alberto Ruggeri</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="Basic example"
                        value={moment(currentProject.creationDate, 'DD/MM/yyyy', true)}
                        onChange={newValue => {
                            setField('creationDate', newValue?.format('DD/MM/yyyy'))
                        }}
                        renderInput={params => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <div>
                <TextField
                    sx={{
                        width: '100%'
                    }}
                    id="descrizione-breve"
                    label="Descrizione breve"
                    multiline
                    rows={4}
                    value={currentProject.descBreve}
                    onChange={e => setField('descBreve', e.target.value)}
                />
            </div>
        </Stack>
    )
}

export default FormProgetto
