import React, { useEffect } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-location'
import { Breadcrumbs, Button, IconButton, Stack, Typography } from '@mui/material'
import * as PropTypes from 'prop-types'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { camelCase, startCase } from 'lodash'
import { purple } from '@mui/material/colors'

NavigateNextIcon.propTypes = { fontSize: PropTypes.string }
/*routeMapping={[
        {
            route: "rubrica",
            label: "Rubrica",
        },*/

const DynamicBreadCrumb = ({ context = '', pathSeparator = '/', routeMapping = [] }) => {
    const normalizedContext = normalizeContext(context)
    const segments = computeSegments(normalizedContext)
    let currentRoute = normalizedContext
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {}, [location.history.location.pathname])
    const go = path => {
        navigate({ to: path })
    }

    const renderRoute = (segment, index) => {
        const isLast = segments.indexOf(segment) === segments.length - 1
        const label = transform(segment, routeMapping)

        if (isLast) {
            return (
                <Typography key={currentRoute} variant={'button'} color={'inherit'}>
                    <span style={{ color: purple[600] }}>{label}</span>
                </Typography>
            )
        }
        currentRoute = currentRoute + '/' + segment
        return (
            <Button id="basic-button" key={currentRoute} aria-haspopup="true" color={'inherit'} onClick={() => go(currentRoute)}>
                {label}
            </Button>
        )
    }
    return (
        <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <IconButton id="basic-button" aria-haspopup="true" onClick={() => go(normalizedContext)}>
                    <HomeOutlinedIcon color={'primary'} />
                </IconButton>
                {segments.map((segment, index) => renderRoute(segment, index))}
            </Breadcrumbs>
        </Stack>
    )
}
const computeSegments = context => {
    let pathname = window.location.pathname
    pathname = pathname.replace(context, '')
    return pathname.split('/').filter(x => x)
}

const normalizeContext = s => {
    if (s === '') {
        return s
    }
    if (s.startsWith('/')) {
        return s
    }
    return '/' + s
}
const transform = (s, routeMapping) => {
    const mapping = routeMapping.find(mapper => mapper.route.toLowerCase() === s.toLowerCase())

    if (mapping) {
        return mapping.label
    }

    return startCase(camelCase(s))
}
export default DynamicBreadCrumb
