import React, { useContext, useEffect, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../data/api'
import { LoginContext } from '../login/SharedLogin/Login.context'
import TestResultsItem from '../TestResults/TestResultsItem'
import NoItems from '../NoItems/NoItems'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    alignItems: 'flex-start',
    '& a': {
      textDecoration: 'none'
    },
  },
  profileHeader: {
    marginTop: theme.spacing(1)
  },
  profileIcon: {
    marginRight: theme.spacing(3),
    width: '60px',
  },
  profileText: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  divider: {
    margin: theme.spacing(4, 0)
  },
  reportsGrid: {
    alignItems: 'stretch',
    '& .MuiCard-root': {
      height: '100%'
    }
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
        <div className={classes.profile}>
          <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt='card icon' aria-hidden="true" />
          <div className={classes.profileText}>
            <Typography className={classes.profileHeader} variant="h2" component="h2">{user.firstName} {user.lastName}</Typography>
            <Typography component="p"><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
            <Typography component="p">{formatPhoneNumber(user.phoneNumber)}</Typography>
          </div>
        </div>
      )}
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {reports && reports.length > 0 ? (
            <>
              <Typography className={classes.header} variant="h2" component="h2">Biomarker tests</Typography>
              <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
                {reports && reports.map((report,i) => <Grid item xs={12} key={i}><TestResultsItem report={report} /></Grid>)}
              </Grid>
            </>
          ) : (
            <>
              <Typography className={classes.header} variant="h2" component="h2">Biomarker tests</Typography>
              <NoItems message="No reports available for this participant." />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className={classes.header} variant="h2" component="h2">Consent forms</Typography>
          <NoItems message="No consent forms are available for this participant." />
        </Grid>
      </Grid>
    </>
  )
}

export default TestResults