import React from 'react'
import { Outlet } from 'react-router-dom'

const TemplateApp = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default TemplateApp
