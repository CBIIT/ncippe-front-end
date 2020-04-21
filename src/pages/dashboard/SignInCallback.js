import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router'
import { Typography, CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { AuthContext } from '../../components/login/AuthContext'
import { LoginContext } from '../../components/login/Login.context'
// import { api } from '../../data/api'
import getAPI from '../../data'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles( theme => ({
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
  container: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
    marginBottom: theme.spacing(4)
  },
}))

const SignInCallback = (props) => {
  const {location: {state: routerState}} = props
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const authContext = useContext(AuthContext)
  const { signinRedirectCallback } = authContext
  const {mockState} = loginContext
  const { t } = useTranslation('a_common')

  useEffect(() => {

    signinRedirectCallback(routerState).then(async resp => {

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

      const {token} = await getAPI.then(api => {
        return api.fetchToken({uuid, email, id_token:resp.id_token}).then(data => {
          if(data instanceof Error) {
            throw new Error(t('components.signin.error.not_auth'))
          } else {
            return data
          }
        })
      })

      const user = await getAPI.then(api => {
        return api.fetchUser({uuid, token}).then(data => {

          if(data instanceof Error){
            throw new Error(t('components.signin.error.not_auth'))
          } else {
            const hasUnviewedReports = (reports, uuid) => {
              //TODO: only for Participants
              if(reports){
                return reports.some(report => {
                  if (!report.viewedBy) {
                    return true
                  } else {
                    return !report.viewedBy.includes(uuid)
                  }
                })          
              } else {
                return null
              }
            }
            
            const userData = {
              ...data,
              phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
              newNotificationCount: data.notifications ? data.notifications.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0,
              newReport: hasUnviewedReports(data.reports, data.uuid)
            }
  
            // sort patient list alphabetically by last name
            if(userData.patients && userData.patients.length > 1){
              const sortedPatients = userData.patients
                // sort alphabetically
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                // bring new accounts to the top
                .sort((a,b) => {
                  if(a.portalAccountStatus === "ACCT_NEW" && b.portalAccountStatus !== "ACCT_NEW") {
                    return -1
                  }
                  if(b.portalAccountStatus === "ACCT_NEW" && a.portalAccountStatus !== "ACCT_NEW") {
                    return 1
                  }
                  return 0
                })
              userData.patients = sortedPatients
            }
  
            return userData
  
          }
        })
      })

      dispatch({
        type: 'update',
        userData: {
          jti: resp.profile.jti,
          auth: true,
          token,
          ...user
        }
      })
      
    }).catch(error => {
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
          }
        }
      })
    })
  }, [])

  useEffect(() => {
    const { roleName, uuid, auth } = loginContext
    window.$role = roleName.slice(9)
    
    if(uuid && auth){
      if( roleName === 'ROLE_PPE_MOCHA_ADMIN') {
        navigate('/account-mocha')
      } else {
        navigate('/account')
      }
    }
  }, [loginContext])

  return (
    <Container className={classes.container}>
      <CircularProgress className={classes.progress} size={70} />
      <Typography className={classes.titleUploading} variant="h6">{t('components.signin.loading')}</Typography>
    </Container>
  )
}

export default SignInCallback