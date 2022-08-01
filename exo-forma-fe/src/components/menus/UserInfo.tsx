import React from 'react'
import { useCheckUserMutation } from '../../api/userApi'
import Box from '@mui/material/Box'
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react'
import { Avatar, Fade } from '@mui/material'
import { END_POINT_LOAD_IMAGE } from '../../services/endpoint/URI_RESOURCES'
import Typography from '@mui/material/Typography'
import { purple } from '@mui/material/colors'

const UserInfo = () => {
    const [, { status, data: user }] = useCheckUserMutation({ fixedCacheKey: 'userKey' })
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    whiteSpace: 'no-wrap',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: 'rgba(106, 27, 154, 0.08)'
                }}
            >
                {status === QueryStatus.fulfilled && (
                    <Avatar
                        sx={{ width: '50%', p: 1, m: 'auto', height: 'auto' }}
                        alt="Remy Sharp"
                        src={END_POINT_LOAD_IMAGE + '?id=' + user?.id + '.jpg'}
                        variant="rounded"
                    />
                )}
                <Typography variant="body1" display="block" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'primary'}>
                    {user?.username}
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {user?.email}
                </Typography>
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>

                    {user?.permissions?.map((p, index) => (
                        <Typography key={index} component="span" color="gray" variant="caption" sx={{ pr: 1, fontWeight: 600 }}>
                            {p} {user?.permissions?.length !== undefined && index !== user?.permissions?.length - 1 && '-'}
                        </Typography>
                    ))}
                </Box>*/}
            </Box>
        </>
    )
}

export default UserInfo
