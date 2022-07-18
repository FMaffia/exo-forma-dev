import React from 'react'
import { FormProps } from '../../model/models'
import { Stack, TextField } from '@mui/material'

const FormDescrizione = ({ currentProject, setField }: FormProps) => {
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
                        width: '100%'
                    }}
                    id="descrizione"
                    label="Descrizione progetto"
                    multiline
                    rows={10}
                    value={currentProject.desc}
                    onChange={e => setField('desc', e.target.value)}
                />
            </div>
        </Stack>
    )
}

export default FormDescrizione
