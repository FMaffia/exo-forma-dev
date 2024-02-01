import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { STEP_FORM_PATH } from '../../constants/Routes'
import { useSelector } from 'react-redux'
import { editMenu } from '../../models/menuItems'
import ButtonMenu from './ButtonMenu'
import ButtonStep from './ButtonStep'

export const emptyArray = []
const EditMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const steps = useSelector(state => state.currentProject.steps) || emptyArray

    const navigateStep = stepNumber => {
        navigate(STEP_FORM_PATH + stepNumber)
    }
    return (
        <div className=" d-flex flex-column  ">
            <div className="d-flex flex-row flex-lg-column justify-content-evenly align-items-center">
                {editMenu.map(m => (
                    <div key={m.path} className={'my-1 w-100'}>
                        <ButtonMenu m={m} handleClick={() => navigate(m.path)} />
                    </div>
                ))}
            </div>
            <br />
            <br />
            {steps?.length > 0 &&
                steps.map(step => (
                    <div key={step?.number} className={'my-1 w-100'}>
                        <ButtonStep step={step} handleClick={() => navigateStep(step?.number)} />
                    </div>
                ))}
        </div>
    )

    /*<div>
<Box sx={{ p: 1, alignSelf: 'left' }}>
<Button id="basic-button" aria-haspopup="true" onClick={() => navigate('/progetti')}>
  <ArrowBackIcon color={'primary'} />
  Indietro
</Button>
</Box>
<Divider />
<MenuList>
<Typography sx={{ p: 2, fontWeight: 600 }} variant={'button'} color={'inherit'}>
  <span style={{ color: purple[600] }}>Informazioni generali</span>
</Typography>
<MenuItem selected={location.pathname === PROJECT_ROOT_NEW} onClick={() => navigate(PROJECT_ROOT_NEW)}>
  <ListItemIcon>
      <AppRegistrationIcon color={'primary'} />
  </ListItemIcon>
  <ListItemText>Descrizione</ListItemText>
</MenuItem>
<MenuItem selected={location.pathname === FEATURE_PATH} onClick={() => navigate(FEATURE_PATH)}>
  <ListItemIcon>
      <LocalFireDepartmentIcon color={'primary'} />
  </ListItemIcon>
  <ListItemText>Caratteristiche</ListItemText>
</MenuItem>
<MenuItem selected={location.pathname === STEP_FORM_PATH_NEW} onClick={() => navigate(STEP_FORM_PATH_NEW)}>
  <ListItemIcon>
      <AddCircle color={'primary'} />
  </ListItemIcon>
  <ListItemText>Aggiungi step</ListItemText>
</MenuItem>
{steps?.length > 0 && (
  <Typography sx={{ p: 2, fontWeight: 600 }} variant={'button'} color={'inherit'}>
      <span style={{ color: purple[600] }}>Steps</span>
  </Typography>
)}
{steps?.map(step => (
  <ListItem selected={location.pathname === STEP_FORM_PATH + step.number} key={step.number} disablePadding>
      <ListItemButton onClick={() => navigateStep(step.number)}>
          <ListItemIcon>
              <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary={`Step ${step.number}`} secondary={step.title} />
      </ListItemButton>
  </ListItem>
))}
</MenuList>
</div>*/
}

export default EditMenu
