import React, { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, CircularProgress, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { AuthContext } from '../../components/login/AuthContext'
import { LoginContext } from '../../components/login/Login.context'
import getAPI from '../../data'

const SignInCallback = () => {
  const location = useLocation()
  const routerState = location.state || {}
  const navigate = useNavigate()
  const [loginContext, dispatch] = useContext(LoginContext)
  const { roleName, uuid, auth, mockState } = loginContext
  const authContext = useContext(AuthContext)
  const { signinRedirectCallback } = authContext
  const { t } = useTranslation('a_common')
 
  useEffect(() => {
    const handleAuth = async () => {
      if (!routerState) {
        navigate('/error', {
          state: {
            error: {
              status: 'error',
              name: 'MissingState',
              message: t('components.signin.error.no_state'),
            },
          },
        })
        return
      }

      try {
        const resp = await signinRedirectCallback(routerState);
        let uuid
        let email

        if (resp.mockUserLogin) {
          if(resp.state === mockState) {
            uuid = resp.profile.sub
            email = resp.profile.email
          } else {
            throw new Error(t('components.signin.error.no_state'))
          }
        } else {
          uuid = resp.profile.sub
          email = resp.profile.email
        }

        const {token} = await getAPI.then(api => 
          api.fetchToken({uuid, email, id_token:resp.id_token}));
        
        if (!token) throw new Error(t('components.signin.error.not_auth'));

        const user = await getAPI.then(api => 
           api.fetchUser({uuid, token}));
        
        if (!user) throw new Error(t('components.signin.error.not_auth'));

        dispatch({
          type: 'update',
          userData: {
            jti: resp.profile.jti,
            auth: true,
            token,
            ...user
          }
        })    
      }
      catch(error){
        localStorage.clear();
        dispatch({
          type: 'reset'
        })
        navigate('/error', {
          state: {
            error: {
              status: 'error',
              name: error.name,
              message: error.message
            },
          },
        })
      }
    }
      handleAuth()
  }, [dispatch, mockState, routerState, signinRedirectCallback, t, navigate ])

  useEffect(() => {
  
    if(uuid && auth && roleName) {
      window.$role = roleName.slice(9)
      const targetRoute =
        roleName === 'ROLE_PPE_MOCHA_ADMIN' ? '/account-mocha' : '/account'

      navigate(targetRoute)
    }
  }, [roleName, uuid, auth,navigate])

  return (
    <Container sx={{ textAlign: 'center', paddingTop: 10, marginBottom: 4 }}>
      <CircularProgress sx={{
    display: 'inline-block',
    verticalAlign: 'middle',
    color: 'primary.main', // or another color
    mr: 2, // marginRight if needed
  }} size={70} />
      <Typography sx={{  marginLeft: 3, display: 'inline' }} variant="h6">
        {t('components.signin.loading')}
      </Typography>
    </Container>
  )
}

export default SignInCallback