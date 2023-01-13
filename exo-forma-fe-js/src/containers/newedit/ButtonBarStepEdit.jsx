import React from 'react'
import { Button } from '@mui/material'
import SaveAs from '@mui/icons-material/SaveAs'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateStepMutation } from '../../api/projectsApi'
import { useSelector } from 'react-redux'

const ButtonBarStepEdit = ({ step, setStep }) => {
    const navigate = useNavigate()
    const { stepEdit } = useParams()
    const reduxProject = useSelector(state => state.currentProject)
    const [updateStep, { isLoading }] = useUpdateStepMutation({ fixedCacheKey: 'update-step' })

    const saveAs = () => {
        let stepRequest = {
            idProject: reduxProject.id,
            number: stepEdit !== 'new' ? step?.number : reduxProject.steps.length + 1,
            title: step?.title,
            desc: step?.desc,
            update: stepEdit !== 'new'
        }
        console.log(stepRequest)
        updateStep(stepRequest)
    }

    return (
        <Button disabled={isLoading} size="large" startIcon={<SaveAs />} variant="contained" onClick={() => saveAs()}>
            {isLoading ? 'dddddd' : 'Salva step'}
        </Button>
    )
}

export default ButtonBarStepEdit
