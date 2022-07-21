import { Container, Paper, styled } from '@mui/material'
import * as React from 'react'
import { User } from '../../types/models'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { MenuUtente } from './MenuUtente'

const PaperUser = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    minHeight: '3rem',
    borderLeft: `${theme.spacing(1)} solid ${theme.palette.secondary.main}`,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center'
}))

export const PanelUtenteDesktop = () => {
    const user: User = useSelector((state: RootState) => state.user)

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'end',
                marginRight: 0
            }}
        >
            <PaperUser>
                {/*  <StyledRating
          name="customized-3"
          readOnly
          max={3}
          defaultValue={2}
          size="small"
        />*/}
                <MenuUtente />
            </PaperUser>
        </Container>
    )
}
