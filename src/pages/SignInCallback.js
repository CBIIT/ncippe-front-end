import React, { useContext, useEffect } from 'react';
import { navigate } from '@reach/router'
import { Box, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../components/login/AuthContext'
import { LoginContext } from '../components/login/Login.context'
import { api } from '../data/api'
import { formatPhoneNumber } from '../utils/utils'

const useStyles = makeStyles( theme => ({
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
}))

const SignInCallback = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const authContext = useContext(AuthContext)
  const { signinRedirectCallback } = authContext
  const {env} = loginContext

  useEffect(() => {

    signinRedirectCallback().then(async resp => {

      const {token} = await api[env].fetchToken({uuid: resp.profile.sub, email: resp.profile.email})
      const user = await api[env].fetchUser({uuid:resp.profile.sub, token}).then(data => {
        console.log("user response", data)
        const newReportCount = (data) => {
          //TODO: only for Participants
          if(data.reports){
            return data.reports.some(report => {
              if (!report.viewedBy) {
                return true
              } else {
                return !report.viewedBy.includes(data.userGUID)
              }
            })          
          } else {
            return null
          }
        }
        const userData = {
          ...data,
          phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
          newNotificationCount: data.notificationList ? data.notificationList.reduce((total, notification) => total + (notification.viewedByUser ? 0 : 1), 0) : 0,
          newReport: newReportCount(data)
        }

        // sort patient list alphabetically by last name
        if(userData.patients && userData.patients.length > 1){
          const sortedPatients = userData.patients.sort((a, b) => a.lastName.localeCompare(b.lastName))
          userData.patients = sortedPatients
        }

        return userData
      })

      dispatch({
        type: 'update',
        userData: {
          jti: resp.profile.jti,
          token,
          ...user
        }
      })
    }).catch(error => {
      console.error(error)
      return error
    })
  }, [])

  useEffect(() => {
    console.log("loginContext effect", loginContext)
    const { roleName, uuid } = loginContext
    if(uuid){
      if( roleName === 'ROLE_PPE_MOCHA_ADMIN') {
        navigate('/dashboard-mocha')
      } else {
        navigate('/dashboard')
      }
    }
  }, [loginContext])

  return (
    <Box>
      <CircularProgress className={classes.progress} size={70} />
      <Typography className={classes.titleUploading} variant="h6">Loading User Data...</Typography>
    </Box>
  )
}

export default SignInCallback