import React, { useContext, useEffect, useState } from 'react'
import { Divider, Grid, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../data/api'
import { LoginContext } from '../login/Login.context'
import TestResultsItem from '../TestResults/TestResultsItem'
import NoItems from '../NoItems/NoItems'
import ExpansionMenu from '../ExpansionMenu/ExpansionMenu'
import UploadConsentDialog from '../UploadConsent/UploadConsentDialog'
import Status from '../Status/Status'
import { formatPhoneNumber } from '../../utils/utils'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    position: 'relative',
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
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  const [files, setFiles] = useState(false)
  const [user, setUser] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    //fetch user
    const {userName, token, env} = loginContext
    const patientID = props.userName || userName
    const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).userGUID
    api[env].fetchPatientTestResults({userGUID: patientGUID, userName: patientID, token}).then(resp => {
      setReports(resp.reports)
      setFiles(resp.otherDocuments)
      setUser(resp)
    })
    return () => {}
  }, [uploadSuccess])

  const openUploadDialog = (e) => {
    setDialogOpen(true)
    setMenuOpen(false)
  }
  const closeUploadDialog = (success) => {
    setDialogOpen(false)
    // setting success to true will trigger data refresh
    setUploadSuccess(success)
  }

  const handleMenuState = (state) => {
    setMenuOpen(state)
  }


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
          <ExpansionMenu
            id="panel1"
            name="Account actions"
            className={classes.menu}
            expanded={menuOpen}
            handleClick={handleMenuState}
            >
              <Link onClick={openUploadDialog}>Upload consent form</Link>
          </ExpansionMenu>
        </div>
      )}

      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography className={classes.header} variant="h2" component="h2">Biomarker tests</Typography>
          {reports && reports.length > 0 ? (
            <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
              {reports && reports.map((report,i) => <Grid item xs={12} key={i}><TestResultsItem report={report} /></Grid>)}
            </Grid>
          ) : (
            <NoItems message="No reports available for this participant." />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className={classes.header} variant="h2" component="h2">Consent forms</Typography>
          {uploadSuccess && <Status state="success" title="Consent form uploaded successfully!" message="We sent an email to let the participant know." />}
          {files && files.length > 0 ? (
            <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
              {files && files.map((file,i) => <Grid item xs={12} key={i}><TestResultsItem report={file} noBadge /></Grid>)}
            </Grid>
          ) : (
            <NoItems message="No consent forms are available for this participant." />
          )}
        </Grid>
      </Grid>
      <UploadConsentDialog open={dialogOpen} setParentState={closeUploadDialog} patientGUID={user.userGUID} />
    </>
  )
}

export default TestResults