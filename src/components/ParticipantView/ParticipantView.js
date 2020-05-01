import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { ClickAwayListener, Divider, Grid, MenuItem, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
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
  providerCard: {
    padding: theme.spacing(4,3),
    '& > :not(:first-child)': {
      marginTop: theme.spacing(2),
      borderTop: '2px solid rgba(0, 0, 0, 0.12)',
      paddingTop: theme.spacing(2)
    }
  }

}))

const TestResults = (props) => {

  const classes = useStyles()
  const {patientId} = props
  const [loginContext] = useContext(LoginContext)
  const [reports, setReports] = useState(false)
  const [files, setFiles] = useState(false)
  const [user, setUser] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isNewParticipant, setIsNewParticipant] = useState(false)
  const { t } = useTranslation('a_common')
  const { trackEvent } = useTracking()
  const {token} = loginContext

  useEffect(() => {
    // const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).uuid
    getAPI.then(api => {
      api.fetchPatientTestResults({patientId, token}).then(resp => {
        setReports(resp.reports)
        setFiles(resp.otherDocuments)
        setUser(resp)
      })
    })
    return () => {}
  }, [uploadSuccess, token, patientId])

  useEffect(() => {
    if(props.location && props.location.state && props.location.state.newParticipantActivated) {
      trackEvent({
        prop42: `BioBank_NewParticipant|Success`,
        eVar42: `BioBank_NewParticipant|Success`,
        events: 'event80',
        eventName: 'NewParticipantSuccess'
      })
      setIsNewParticipant(true)
    }
  }, [trackEvent, props.location])

  const openUploadDialog = (e) => {
    const buttonText = e.target.textContent
    trackEvent({
      prop42: `BioBank_AccountActions|Click:${buttonText}`,
      eVar42: `BioBank_AccountActions|Click:${buttonText}`,
      events: 'event28',
      eventName: 'AccountActionsUpload'
    })
    setDialogOpen(true)
    setUploadSuccess(false)
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
      events: 'event28',
      eventName: 'AccountActionsLeave'
    })
    navigate(`${window.location.pathname}/participation/leaveQuestions`,{state: {
      user
    }})
  }

  const handleMenuState = (state) => {
    trackEvent({
      prop42: `BioBank_AccountActions|Expand`,
      eVar42: `BioBank_AccountActions|Expand`,
      events: 'event26',
      eventName: 'AccountActionsExpand'
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
          <img className={classes.profileIcon} src={`/${process.env.PUBLIC_URL}assets/icons/user-profile.svg`} alt={t('icons.user_profile')} aria-hidden="true" />
          <div className={`${classes.profileText} highContrast`}>
            <Typography className={classes.profileHeader} variant="h2" component="h2">{user.firstName} {user.lastName}</Typography>
            {user.isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>{t('badges.not_participating')}</Typography></div>}
            <Typography><a href={`mailto:${user.email}`}>{user.email}</a></Typography>
            <Typography><a href={`tel:${user.phoneNumber}`}>{formatPhoneNumber(user.phoneNumber)}</a></Typography>
          </div>
          <LoginConsumer>
            {([{roleName}]) => {
              return (roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className={classes.menuContainer}>
                    <ExpansionMenu
                      id="panel1"
                      name={t('menu.account_actions.name')}
                      className={classes.menu}
                      expanded={menuOpen}
                      handleClick={handleMenuState}
                      variant="floating"
                      >
                        <MenuItem onClick={openUploadDialog}>{t('menu.account_actions.upload_consent')}</MenuItem>
                        {user.isActiveBiobankParticipant !== false && <MenuItem onClick={openLeaveQuestions}>{t('menu.account_actions.leave_biobank')}</MenuItem>}
                    </ExpansionMenu>
                  </div>
                </ClickAwayListener>
              )
            }}
          </LoginConsumer>
          {isNewParticipant &&
            <Status state="success" 
              title={t('components.participantView.status.added.title')} 
              message={t('components.participantView.status.added.message')} />
          }
        </div>
      )}
      {user && user.isActiveBiobankParticipant === false && <Status state="info" fullWidth 
        title={t('components.participantView.status.info.title')} 
        message={t('components.participantView.status.info.message', {date:moment(user.dateDeactivated).format("MMM DD, YYYY")})} />
      }

      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} id="reports">
              <Typography className={classes.header} variant="h2" component="h2">{t('components.biomarkerView.pageTitle')} </Typography>
              {reports && reports.length > 0 ? (
                <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
                  {reports && reports.map((report,i) => <Grid item xs={12} key={i}><TestResultsItem report={report} patientId={user.patientId} /></Grid>)}
                </Grid>
              ) : (
                <NoItems message={t('components.biomarkerView.no_results.admin')} />
              )}
              {user && user.isActiveBiobankParticipant === false && user.questionAnswers && (
                <DeactivatedQuestions user={user} />
              )}
            </Grid>
            <Grid xs={12} item id="eConsentForms">
              <Typography className={classes.header} variant="h2" component="h2">{t('components.consentView.pageTitle')}</Typography>
              {uploadSuccess && <Status state="success" 
                title={t('components.participantView.status.uploaded.title')}
                message={t('components.participantView.status.uploaded.message')} />
              }
              {files && files.length > 0 ? (
                <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
                  {files && files.map((file,i) => <Grid item xs={12} key={i}><TestResultsItem report={file} patientId={user.patientId} noBadge /></Grid>)}
                </Grid>
              ) : (
                <NoItems message={t('components.consentView.no_results.admin')} />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} id="providers">
          <Typography className={classes.header} variant="h2" component="h2">{t('components.providerView.pageTitle')}</Typography>
          {user.providers ? (
            <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
              <Grid item xs={12}>
                <Paper elevation={25} className={classes.providerCard}>
                  {user.providers.map((provider,i) => <div key={i} className={classes.providerCard_details}>
                      <Typography><strong>Dr. {provider.firstName} {provider.lastName}</strong></Typography>
                      <Typography><a href={`tel:${provider.phoneNumber}`}>{formatPhoneNumber(provider.phoneNumber)}</a></Typography>
                      <Typography><a href={`mailto:${provider.email}`}>{provider.email}</a></Typography>
                    </div>
                  )}
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <NoItems message={t('components.providerView.no_results')} />
          )}
        </Grid>
      </Grid>
      <UploadConsentDialog open={dialogOpen} setParentState={closeUploadDialog} patientId={user.patientId} />
    </>
  )
}

export default TestResults