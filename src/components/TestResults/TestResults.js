import React, { useContext, useEffect, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import TestResultsItem from './TestResultsItem'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block'
  },
  grid: {
    marginBottom: theme.spacing(3)
  },
  header: {
    margin: `${theme.spacing(3)}px 0`
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`
  }
}))

const TestResults = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [reports, setReports] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    //fetch mock users list
    const {userName, token, env, reports, userType, userGUID} = loginContext
    // const userID = props.location.state? props.location.state.userName : userName
    if(userType === 'PPE_PARTICIPANT') {
      if(reports && reports.length > 0) {
        setReports(reports)
      }
    } else {
      const patientID = props.userName || userName
      const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).userGUID
      api[env].fetchPatientTestResults({userGUID: patientGUID, userName: patientID, token}).then(resp => {
        setReports(resp.reports)
        setUser(resp)
      })
    }
  }, [])

  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Biomarker Tests
      </Typography>
      {user && (
        <>
          <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
          <Typography component="p"><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
          <Typography component="p">{formatPhoneNumber(user.phoneNumber)}</Typography>
        </>
      )}
      {reports ? (
        <>
          {!user && (
            <Typography gutterBottom>The NCI lab generates a biomarker report after we collect your biosample. Your reports are available below. Your provider has access to your reports as well.</Typography>
          )}
          <Divider className={classes.divider} />
          <Grid container className={classes.controlsGrid} spacing={3} alignItems="center">
            {reports && reports.map((report,i) => <TestResultsItem key={i} report={report} />)}
          </Grid>
        </>
      ) : (
        <>
          <Divider className={classes.divider} />
          <Typography>After we collect your first biosample, an NCI lab will [do something with it] and you will be able to access the results here. We will also send your report to your healthcare provider.</Typography>
        </>
      )}
    </>
  )
}

export default TestResults