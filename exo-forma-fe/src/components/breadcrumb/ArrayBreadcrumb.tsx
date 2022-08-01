import React from 'react'
import { Box, Stack } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from '@mui/material/Link'
import { useNavigate } from '@tanstack/react-location'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Path } from '../../types/models'

type Props = {
    segments: Path[]
}
const ArrayBreadcrumb = ({ segments }: Props) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                paddingBottom: 2
            }}
        >
            <Stack spacing={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {segments.map(b => (
                        <Link
                            underline="hover"
                            color="text.primary"
                            href={b.href}
                            onClick={event => {
                                event.preventDefault()
                                navigate({ to: b.href })
                            }}
                            aria-current="page"
                        >
                            {b.label}
                        </Link>
                    ))}
                </Breadcrumbs>
            </Stack>
        </Box>
    )
}

export default ArrayBreadcrumb
