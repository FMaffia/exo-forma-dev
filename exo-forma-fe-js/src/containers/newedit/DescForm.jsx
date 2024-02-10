import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useKeycloak } from '@react-keycloak/web'
import { setPartialProject } from '../../slices/projectSlice'

const DescForm = () => {
    const currentProject = useSelector(state => state.currentProject)
    const { keycloak } = useKeycloak()
    const author = currentProject.author || keycloak.tokenParsed.name
    const dispatch = useDispatch()
    const setPartialProjectInternal = (field, value) => {
        dispatch(setPartialProject({ field, value }))
    }
    return
    /*<Stack direction="column" spacing={2}>
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
      <Container className="px-0" fluid>
          <UploadCover />
      </Container>

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
  </Stack>*/
}

export default DescForm;
