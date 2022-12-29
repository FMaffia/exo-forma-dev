import React from 'react'
import Box from '@mui/material/Box'
import { Avatar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useKeycloak } from '@react-keycloak/web'
import useKeyRoles from '../../utility/useKeyRoles'
import woman from '../../img/woman.png'

const UserInfo = () => {
    const { keycloak } = useKeycloak()
    const role = useKeyRoles()

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
                <Avatar sx={{ width: '50%', p: 1, m: 'auto', height: 'auto' }} alt="Remy Sharp" src={woman} variant="rounded" />

                <Typography variant="body1" display="block" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'primary'}>
                    {keycloak?.tokenParsed?.name}
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {keycloak?.tokenParsed?.email}
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {role}
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
