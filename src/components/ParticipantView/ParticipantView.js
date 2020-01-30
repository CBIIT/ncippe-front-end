import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { ClickAwayListener, Divider, Grid, MenuItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTracking } from 'react-tracking'
import moment from 'moment'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext, LoginConsumer } from '../login/Login.context'
import TestResultsItem from '../TestResults/TestResultsItem'
import NoItems from '../NoItems/NoItems'
import ExpansionMenu from '../ExpansionMenu/ExpansionMenu'
import UploadConsentDialog from '../UploadConsent/UploadConsentDialog'
import Status from '../Status/Status'
import { formatPhoneNumber } from '../../utils/utils'
import DeactivatedQuestions from '../DeactivatedQuestions/DeactivatedQuestions'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '& a': {
      textDecoration: 'none'
    },
  },
  profileHeader: {
    marginTop: theme.spacing(1),
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
  badge: {
    display: 'inline-block',
    borderRadius: 6,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    padding: '4px 16px',
    lineHeight: 'normal',
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  divider: {
    margin: theme.spacing(4, 0)
  },
  reportsGrid: {
    alignItems: 'stretch',
    '& .MuiCard-root': {
      height: '100%'
    }
  },

}))

const TestResults = (props) => {

  const classes = useStyles()
  const {patientId} = props
  const [loginContext, dispatch] = useContext(LoginContext)
  const [reports, setReports] = useState(false)
  const [files, setFiles] = useState(false)
  const [user, setUser] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isNewParticipant, setIsNewParticipant] = useState(false)
  const { trackEvent } = useTracking()

  useEffect(() => {
    //fetch participant data
    const {token} = loginContext
    // const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).uuid
    getAPI.then(api => {
      api.fetchPatientTestResults({patientId, token}).then(resp => {
        setReports(resp.reports)
        setFiles(resp.otherDocuments)
        setUser(resp)
      })
    })
    return () => {}
  }, [uploadSuccess,getAPI])

  useEffect(() => {
    if(props.location && props.location.state && props.location.state.newParticipantActivated) {
      trackEvent({
        prop42: `BioBank_NewParticipant|Success`,
        eVar42: `BioBank_NewParticipant|Success`,
        events: 'event80'
      })
      setIsNewParticipant(true)
    }
  }, [props.location.state])

  const openUploadDialog = (e) => {
    const buttonText = e.target.textContent
    trackEvent({
      prop42: `BioBank_AccountActions|Click:${buttonText}`,
      eVar42: `BioBank_AccountActions|Click:${buttonText}`,
      events: 'event28'
    })
    setDialogOpen(true)
    setMenuOpen(false)
  }
  const closeUploadDialog = (success) => {
    setDialogOpen(false)
    // setting success to true will trigger data refresh
    // TODO: on success update front-end state instead of data fetch
    setUploadSuccess(success)
  }

  const openLeaveQuestions = (e) => {
    const buttonText = e.target.textContent
    trackEvent({
      prop42: `BioBank_AccountActions|Click:${buttonText}`,
      eVar42: `BioBank_AccountActions|Click:${buttonText}`,
      events: 'event28'
    })
    navigate(`${window.location.pathname}/participation/leaveQuestions`,{state: {
      user
    }})
  }

  const handleMenuState = (state) => {
    trackEvent({
      prop42: `BioBank_AccountActions|Expand`,
      eVar42: `BioBank_AccountActions|Expand`,
      events: 'event26'
    })
    setMenuOpen(prevState => !prevState)
  }

  const handleClickAway = () => {
    setMenuOpen(false);
  };


  return (
    <>
      {user && (
        <div className={classes.profile}>
          <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt='card icon' aria-hidden="true" />
          <div className={classes.profileText}>
            <Typography className={classes.profileHeader} variant="h2" component="h2">{user.firstName} {user.lastName}</Typography>
            {user.isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>Not participating</Typography></div>}
            <Typography component="p"><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
            <Typography component="p">{formatPhoneNumber(user.phoneNumber)}</Typography>
          </div>
          <LoginConsumer>
            {([{roleName}]) => {
              return (roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className={classes.menuContainer}>
                    <ExpansionMenu
                      id="panel1"
                      name="Account actions"
                      className={classes.menu}
                      expanded={menuOpen}
                      handleClick={handleMenuState}
                      style="floating"
                      >
                        <MenuItem onClick={openUploadDialog}>Upload consent form</MenuItem>
                        {user.isActiveBiobankParticipant !== false && <MenuItem onClick={openLeaveQuestions}>Leave the Biobank</MenuItem>}
                    </ExpansionMenu>
                  </div>
                </ClickAwayListener>
              )
            }}
          </LoginConsumer>
          {isNewParticipant &&
            <Status state="success" title="New participant added successfully" message="This participant can now activate their online Biobank account. You can add additional consent forms under account actions." />
          }
        </div>
      )}
      {user && user.isActiveBiobankParticipant === false && <Status state="info" fullWidth title="This participant has left the Biobank." message={`The participant left the Biobank on ${moment(user.dateDeactivated).format("MMM DD, YYYY")}. They will need to talk to their research coordinator to rejoin.`} />}

      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} id="reports">
          <Typography className={classes.header} variant="h2" component="h2">Biomarker tests</Typography>
          {reports && reports.length > 0 ? (
            <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
              {reports && reports.map((report,i) => <Grid item xs={12} key={i}><TestResultsItem report={report} patientId={user.patientId} /></Grid>)}
            </Grid>
          ) : (
            <NoItems message="No reports available<br /> for this participant." />
          )}
          {user && user.isActiveBiobankParticipant === false && user.questionAnswers && (
            <DeactivatedQuestions user={user} />
          )}
        </Grid>
        <Grid item xs={12} md={6} id="eConsentForms">
          <Typography className={classes.header} variant="h2" component="h2">Consent forms</Typography>
          {uploadSuccess && <Status state="success" title="Consent form uploaded successfully" message="We sent an email to let the participant know." />}
          {files && files.length > 0 ? (
            <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
              {files && files.map((file,i) => <Grid item xs={12} key={i}><TestResultsItem report={file} patientId={user.patientId} noBadge /></Grid>)}
            </Grid>
          ) : (
            <NoItems message="No consent forms available<br/> for this participant." />
          )}
        </Grid>
      </Grid>
      <UploadConsentDialog open={dialogOpen} setParentState={closeUploadDialog} patientId={user.patientId} />
    </>
  )
}

export default TestResults