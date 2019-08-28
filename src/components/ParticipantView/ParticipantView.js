import React, { useContext, useEffect, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import TestResultsItem from '../TestResults/TestResultsItem'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(3, 0)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
}))

const TestResults = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const [reports, setReports] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    //fetch user
    const {userName, token, env} = loginContext
    const patientID = props.userName || userName
    const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).userGUID
    api[env].fetchPatientTestResults({userGUID: patientGUID, userName: patientID, token}).then(resp => {
      setReports(resp.reports)
      setUser(resp)
    })
  }, [])

  return (
    <>
      {user && (
        <>
          <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
          <Typography component="p"><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
          <Typography component="p">{formatPhoneNumber(user.phoneNumber)}</Typography>
        </>
      )}
      {reports ? (
        <>
          <Divider className={classes.divider} />
          <Typography className={classes.header} variant="h5">Biomarker Tests</Typography>
          <Grid container className={classes.controlsGrid} spacing={3} alignItems="stretch">
            {reports && reports.map((report,i) => <TestResultsItem key={i} report={report} />)}
          </Grid>
        </>
      ) : (
        <>
          <Divider className={classes.divider} />
          <Typography className={classes.header} variant="h5">Biomarker Tests</Typography>
          <Typography>No reports available for this participant.</Typography>
        </>
      )}
    </>
  )
}

export default TestResults