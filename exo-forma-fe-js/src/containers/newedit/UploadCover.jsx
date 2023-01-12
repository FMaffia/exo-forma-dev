import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useUploadImageMutation } from '../../api/projectsApi'
import { useSelector } from 'react-redux'

const UploadCover = () => {
    const id = useSelector(state => state.currentProject.id)
    const prefix = 'data:image/png;base64,'
    const base64DB = useSelector(state => state.currentProject.image)
    const [image, setImage] = useState(base64DB && prefix + base64DB)
    const [uploadImage, { isLoading }] = useUploadImageMutation()

    const uploadFile = file => {
        let reader = new FileReader()
        reader.onload = function () {
            const base64 = reader.result.substring(reader.result.indexOf(',') + 1)
            const request = {
                id,
                image: base64
            }
            uploadImage(request)
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }
    return isLoading ? (
        <p>Loading</p>
    ) : image ? (
        <img alt="" src={image} height={400} />
    ) : (
        <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={e => uploadFile(e.target.files[0])} />
        </Button>
    )
}

export default UploadCover
