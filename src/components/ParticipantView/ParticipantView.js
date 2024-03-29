import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { Button, Chip, ClickAwayListener, Dialog, DialogContent, DialogActions, Divider, Grid, MenuItem, Paper, Typography } from '@material-ui/core'
import { Edit as EditIcon, Clear as ClearIcon } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import moment from 'moment'

// import { api } from '../../data/api'
import getAPI from '../../data'
import { LoginContext, LoginConsumer } from '../login/Login.context'
import FileList from '../FileList/FileList.events'
import Email from '../inputs/Email'
import NoItems from '../NoItems'
import ExpansionMenu from '../ExpansionMenu'
import UploadConsentDialog from '../UploadConsent/UploadConsentDialog'
import Status from '../Status'
import { formatPhoneNumber } from '../../utils/utils'
import DeactivatedQuestions from '../DeactivatedQuestions'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  profileTop: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
      paddingBottom: 0
    },
    '& > div:first-child': {
      flexGrow: 1
    }
  },
  profile: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    marginBottom: theme.spacing(2),
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
  chip: {
    marginLeft: theme.spacing(1),
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
  email:{
    display: "flex",
    alignItems: "center",
    columnGap: theme.spacing(1),
    "& button": {
      padding: theme.spacing(1),
      minWidth: 0,
    },
    "& svg": {
      fontSize: "1.2rem"
    }
  },
  menu: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      top: 0,
      right: 0
    }
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
      borderTop: `2px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing(2)
    }
  }

}),{name: 'ParticipantView'})

const ParticipantView = (props) => {
  const classes = useStyles()
  const {patientId, isMobile} = props
  const [loginContext, dispatch] = useContext(LoginContext)
  const { uuid, token, patients } = loginContext
  const [dialogOpenConsent, setDialogOpenConsent] = useState(false)
  const [dialogOpenEmail, setDialogOpenEmail] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isNewParticipant, setIsNewParticipant] = useState(false)
  const { t } = useTranslation('a_common')
  const [participant, setParticipant] = useState(patients.find(patient => patient.patientId === patientId))
  const [participantEmail, setParticipantEmail] = useState(participant.email)

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //from https://emailregex.com/
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    // const patientGUID = loginContext.patients.find(patient => patient.userName === props.userName).uuid
    const patientData = patients.find(patient => patient.patientId === patientId)
    if(!patientData.reports) {
      getAPI.then(api => {
        //TODO: stuff participant data into user's context for patients - prevent multiple fetch calls for same patient
        api.fetchPatientTestResults({patientId, adminId: uuid, token}).then(resp => {
          if(resp instanceof Error) {
            setParticipant({
              portalAccountStatus: "ACCT_TERMINATED_AT_PPE"
            })
            throw resp
          }

          dispatch({
            type: 'addPatientData',
            patients: patients.map(patient => {
              if(patient.patientId === patientId){
                patient = resp
              }
              return patient
            })
          })
          setParticipant(resp)

        })
        .catch(error => {
          console.error(error)
        })
      })
    }
    return () => {}
  }, [uploadSuccess, patientId, uuid, token, patients, dispatch])

  useEffect(() => {
    if(props.location && props.location.state && props.location.state.newParticipantActivated) {
      PubSub.publish('ANALYTICS', {
        events: 'event80',
        eventName: 'NewParticipantSuccess',
        prop42: `BioBank_NewParticipant|Success`,
        eVar42: `BioBank_NewParticipant|Success`,
      })
      setIsNewParticipant(true)
    }
  }, [props.location])

  const openUploadDialog = (e) => {
    const buttonText = e.target.textContent
    PubSub.publish('ANALYTICS', {
      events: 'event28',
      eventName: 'AccountActionsUpload',
      prop42: `BioBank_AccountActions|Click:${buttonText}`,
      eVar42: `BioBank_AccountActions|Click:${buttonText}`,
    })
    setDialogOpenConsent(true)
    setUploadSuccess(false)
    setMenuOpen(false)
  }
  const closeUploadDialog = (success) => {
    setDialogOpenConsent(false)
    // setting success to true will trigger data refresh
    // TODO: on success update front-end state instead of data fetch
    setUploadSuccess(success)
  }

  const editProfile = (e) => {
    navigate(`${window.location.pathname}/profile`,{state: {
      participant
    }})
  }

  const openLeaveQuestions = (e) => {
    const buttonText = e.target.textContent
    PubSub.publish('ANALYTICS', {
      events: 'event28',
      eventName: 'AccountActionsLeave',
      prop42: `BioBank_AccountActions|Click:${buttonText}`,
      eVar42: `BioBank_AccountActions|Click:${buttonText}`,
    })
    navigate(`${window.location.pathname}/participation/leaveQuestions`)
  }

  const handleMenuState = (state) => {
    PubSub.publish('ANALYTICS', {
      events: 'event26',
      eventName: 'AccountActionsExpand',
      prop42: `BioBank_AccountActions|Expand`,
      eVar42: `BioBank_AccountActions|Expand`,
    })
    setMenuOpen(prevState => !prevState)
  }

  const handleClickAway = () => {
    setMenuOpen(false);
  }

  const updateEmail = (val) => {
    setParticipantEmail(val)
  }

  const dialogCloseEmail = (e) => {
    setDialogOpenEmail(false)
    // clear any errors on cancel
    setErrorEmail(false)
    // reset the email to the original value
    setParticipantEmail(participant.email)
  }
  
  const handleEditEmail = (e) => {
    setDialogOpenEmail(true)
  }

  const handleConfirmEmail = (e) => {
    const isValid = emailRegex.test(participantEmail)
    setErrorEmail(!isValid)
    if(isValid) {
      // Get API
      getAPI.then(api => {
        api.updateParticipantEmail({patientId, email: participantEmail, token}).then(resp => {
          if(resp instanceof Error) {
            throw resp
          }

          dispatch({
            type: 'addPatientData',
            patients: patients.map(patient => {
              if(patient.patientId === patientId){
                patient = resp
              }
              return patient
            })
          })
          // the response should be the updated participant data
          setParticipant(resp)
          setDialogOpenEmail(false)

        })
        .catch(error => {
          console.error(error)
        })
      })
    }
  }



  return (
    <>
      {participant && (
        <div className={classes.profileTop}>
          <div>
            <div className={classes.profile}>
              <img className={classes.profileIcon} src={`${process.env.PUBLIC_URL}/assets/icons/user-profile.svg`} alt={t('icons.user_profile')} aria-hidden="true" />
              <div className={`${classes.profileText} highContrast`}>
                <Typography className={classes.profileHeader} variant="h2" component="h2">{participant.firstName} {participant.lastName} <Chip className={classes.chip} size="small" label={patientId}/></Typography>
                {participant.isActiveBiobankParticipant === false && <div><Typography className={classes.badge}>{t('badges.not_participating')}</Typography></div>}
                {participant.portalAccountStatus === "ACCT_TERMINATED_AT_PPE" && <div><Typography className={classes.badge}>{t('badges.terminated')}</Typography></div>}
                <div className={classes.email}>
                  {participant.email && <Typography><a href={`mailto:${participant.email}`}>{participant.email}</a></Typography>}
                  {!participant.email && <Typography>No email address</Typography>}
                  {!participant.uuid && <Button color="primary" onClick={handleEditEmail}><EditIcon /></Button>}
                </div>
                {participant.phoneNumber && <Typography><a href={`tel:${participant.phoneNumber}`}>{formatPhoneNumber(participant.phoneNumber)}</a></Typography>}
              </div>
            </div>
            {isNewParticipant &&
              <Status state="success" 
                title={t('components.participantView.status.added.title')} 
                message={t('components.participantView.status.added.message')} />
            }
          </div>
          <LoginConsumer>
              {([{roleName}]) => {
                return (roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.menuContainer}>
                      <ExpansionMenu
                        id="panel1"
                        menuText={t('menu.account_actions.name')}
                        className={classes.menu}
                        expanded={menuOpen}
                        handleClick={handleMenuState}
                        variant="floating"
                        >
                          {participant.uuid && <MenuItem onClick={editProfile}>{t('menu.account_actions.edit_profile')}</MenuItem>}
                          <MenuItem onClick={openUploadDialog}>{t('menu.account_actions.upload_consent')}</MenuItem>
                          {participant.isActiveBiobankParticipant !== false && <MenuItem onClick={openLeaveQuestions}>{t('menu.account_actions.leave_biobank')}</MenuItem>}
                      </ExpansionMenu>
                    </div>
                  </ClickAwayListener>
                )
              }}
            </LoginConsumer>
        </div>
      )}
      {participant && participant.isActiveBiobankParticipant === false && <Status state="info" fullWidth 
        title={t('components.participantView.status.info.title')} 
        message={t('components.participantView.status.info.message', {date:moment(participant.dateDeactivated).format("MMM DD, YYYY")})} />
      }
      {participant && participant.portalAccountStatus === "ACCT_TERMINATED_AT_PPE" && <Status state="error" fullWidth 
        title={t('components.participantView.status.terminated.title')} 
        message={t('components.participantView.status.terminated.message')} />
      }

      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} id="reports">
              <Typography className={classes.header} variant="h2" component="h2">{t('components.biomarkerView.pageTitle')} </Typography>
              <FileList 
                files={participant.reports} 
                noItemsMsg={t('components.biomarkerView.no_results.admin')} 
                patientId={patientId}
                type="report"
              />
            </Grid>

            {/* Consent Form for CRC and above */}
            <LoginConsumer>
              {([{roleName}]) => {
                return (roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && (
                  <Grid xs={12} item id="eConsentForms">
                    <Typography className={classes.header} variant="h2" component="h2">{t('components.consentView.pageTitle')}</Typography>
                    {uploadSuccess && <Status state="success" 
                      title={t('components.participantView.status.uploaded.title')}
                      message={t('components.participantView.status.uploaded.message')} />
                    }
                    <FileList
                      files={participant.otherDocuments} 
                      noItemsMsg={t('components.consentView.no_results.admin')} 
                      patientId={patientId} 
                      type="consentForm"
                    />
                  </Grid>
                )
              }}
            </LoginConsumer>

            {participant && participant.isActiveBiobankParticipant === false && participant.questionAnswers && (
              <Grid item xs={12} id="withdrawal">
                <Typography className={classes.header} variant="h2" component="h2">{t('components.withdrawalView.pageTitle')} </Typography>
                  <DeactivatedQuestions participant={participant} />
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Consent Form for Provider */}
        <LoginConsumer>
          {([{roleName}]) => {
            return (roleName === "ROLE_PPE_PROVIDER") && (
              <Grid item xs={12} md={6} id="eConsentForms">
                <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
                  <Grid xs={12} item>
                    <Typography className={classes.header} variant="h2" component="h2">{t('components.consentView.pageTitle')}</Typography>
                    {uploadSuccess && <Status state="success" 
                      title={t('components.participantView.status.uploaded.title')}
                      message={t('components.participantView.status.uploaded.message')} />
                    }
                    <FileList 
                      files={participant.otherDocuments} 
                      noItemsMsg={t('components.consentView.no_results.admin')} 
                      patientId={patientId} 
                      type="consentForm"
                    />
                  </Grid>
                </Grid>
              </Grid>
            )
          }}
        </LoginConsumer>

        {/* Show Providers assigned to this participant */}
        <LoginConsumer>
          {([{roleName}]) => {
            return (roleName === "ROLE_PPE_CRC" || roleName === "ROLE_PPE_BSSC" || roleName === "ROLE_PPE_ADMIN") && (
              <Grid item xs={12} md={6} id="providers">
                <Typography className={classes.header} variant="h2" component="h2">{t('components.providerView.pageTitle')}</Typography>
                {participant.providers ? (
                  <Grid container className={classes.reportsGrid} spacing={3} alignItems="stretch">
                    <Grid item xs={12}>
                      <Paper elevation={25} className={classes.providerCard}>
                        {participant.providers.map((provider,i) => <div key={i} className={classes.providerCard_details}>
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
            )
          }}
        </LoginConsumer>
      </Grid>
      <UploadConsentDialog open={dialogOpenConsent} setParentState={closeUploadDialog} patientId={patientId} />
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpenEmail}
        onClose={dialogCloseEmail}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Typography variant={isMobile ? "h4" : "h3"} component="h3">{t('a_common:components.participantView.changeEmail.title')}</Typography>
          <Typography>{t('a_common:components.participantView.changeEmail.desc')}</Typography>
          <Email value={participantEmail} editMode={true} error={errorEmail} onChange={updateEmail} />
        </DialogContent>
        <DialogActions>
          <Button className={classes.dialogBtnSubmit} onClick={handleConfirmEmail} color="primary" variant="contained">{t('a_common:buttons.save')}</Button>
          <Button variant="text" color="primary" onClick={dialogCloseEmail}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ParticipantView