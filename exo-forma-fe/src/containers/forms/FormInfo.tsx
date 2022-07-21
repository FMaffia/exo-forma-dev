import React, { useEffect } from 'react'
import { FormProps } from '../../types/models'
import { Box, Rating, Stack, styled, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import 'moment/locale/it'
import Autocomplete from '@mui/material/Autocomplete'
import CategorieChips from './CategorieChips'
import StarIcon from '@mui/icons-material/Star'
import { purple } from '@mui/material/colors'

const labels: { [index: string]: string } = {
    0.5: 'Molto facile',
    1: 'Facile',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+'
}
export const normalizePath = (titleProject: string): string => {
    return '/' + titleProject.replaceAll(' ', '-')
}
const FormInfo = ({ currentProject, setField }: FormProps) => {
    const authorsMock = ['Edo Galizia', 'Valentin Puscasu', 'Yuri Quaglia', 'Alberto Ruggeri']
    const [hover, setHover] = React.useState(-1)

    useEffect(() => {
        if (currentProject.creationDate === '' || currentProject.creationDate === undefined) {
            setField('creationDate', moment().format('DD/MM/yyyy'))
        }
    }, [currentProject.creationDate])

    const defaultProps = {
        options: authorsMock,
        getOptionLabel: (option: string) => option
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: purple['800']
        },
        '& .MuiRating-iconHover': {
            color: purple['400']
        }
    })

    return (
        <Stack
            direction="column"
            spacing={3}
            sx={{
                width: '80%'
            }}
        >
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                <Autocomplete
                    sx={{
                        width: '40%',
                        mr: 2
                    }}
                    {...defaultProps}
                    id="select-on-focus"
                    renderInput={params => <TextField onChange={e => setField('authors', e.target.value)} {...params} label="Autore" variant="standard" />}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="Data creazione"
                        value={moment(currentProject.creationDate, 'DD/MM/yyyy', true)}
                        onChange={newValue => {
                            setField('creationDate', newValue?.format('DD/MM/yyyy'))
                        }}
                        renderInput={params => (
                            <TextField
                                sx={{
                                    width: '38%'
                                }}
                                {...params}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    helperText={`Il path del progetto sarà: ${normalizePath(currentProject.title)}`}
                    sx={{
                        width: '50%'
                    }}
                    id="titolo-progetto"
                    label="Titolo progetto"
                    variant="outlined"
                    value={currentProject.title}
                    onChange={e => {
                        setField('path', normalizePath(e.target.value))
                        setField('title', e.target.value)
                    }}
                />

                <Box sx={{ ml: 2 }}>
                    <Typography color="primary" component="legend">
                        Difficoltà
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <StyledRating
                            value={currentProject.difficult}
                            name="customized-color"
                            defaultValue={0}
                            max={5}
                            precision={0.5}
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                            onChange={(event, newValue) => {
                                setField('difficult', newValue)
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover)
                            }}
                        />
                        {currentProject.difficult !== null && (
                            <Box sx={{ ml: 2 }}>
                                <Typography color="primary" variant="button">
                                    {labels[hover !== -1 ? hover : currentProject.difficult]}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <TextField
                sx={{
                    width: '80%'
                }}
                id="descrizione"
                label="Descrizione breve"
                multiline
                rows={3}
                value={currentProject.descBreve}
                onChange={e => setField('descBreve', e.target.value)}
            />
            <CategorieChips currentProject={currentProject} setField={setField} />
        </Stack>
    )
}

export default FormInfo
