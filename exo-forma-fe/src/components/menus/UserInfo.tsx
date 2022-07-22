import React from 'react'
import { useCheckUserMutation } from '../../api/userApi'
import Box from '@mui/material/Box'
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react'
import { Avatar } from '@mui/material'
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
                    flexGrow: 3,
                    alignItems: 'center',
                    px: 1,
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

                <Typography sx={{ p: 1, fontWeight: 600, fontSize: '1.5rem' }} variant={'button'} color={'inherit'}>
                    <span style={{ color: purple[600], textAlign: 'center', lineHeight: '1rem' }}>{user?.username}</span>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
                    {user?.permissions?.map((p, index) => (
                        <Typography key={index} component="span" color="gray" variant="caption" sx={{ pr: 1, fontWeight: 600 }}>
                            {p} {user?.permissions?.length !== undefined && index !== user?.permissions?.length - 1 && '-'}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default UserInfo
