import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
import { navigate } from '@reach/router'
import moment from 'moment'

import getAPI from '../../data'

import { AddParticipantContext } from './AddParticipant.context'
import { LoginContext } from '../login/Login.context'

import WorkflowStepper from './WorkflowStepper'
import ParticipantInfo from './ParticipantInfo'
import AddConsent from './AddConsent'
import Progress from '../Progress'

const useStyles = makeStyles( theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.success.light
  },
}),{name: 'AddParticipantWorkflow'})

const AddParticipantWorkflow = (props) => {
  const {open = false, setParentState, patient: {firstName, lastName, email, lang, patientId, dateCreated} = {} } = props
  const classes = useStyles()
  const [addParticipantContext, dispatch] = useContext(AddParticipantContext)
  const [loginContext, loginDispatch] = useContext(LoginContext)
  const {token, uuid, patients} = loginContext
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation(['a_addParticipant','a_common'])
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isOpen, setIsOpen] = useState(false)
  const [submitText, setSubmitText] = useState(t('form.save'))

  // set activeStep when navigation value changes
  useEffect(() => {
    // console.log(addParticipantContext.navigate)
    if(addParticipantContext.navigate) {
      handleNavigate(addParticipantContext.navigate)
    }
  }, [addParticipantContext.navigate])

  useEffect(() => {
    setIsOpen(open)
    // pass any available patient data into context
    dispatch({
      type: "update",
      data: {
        patientId,
        firstName,
        lastName,
        email,
        lang,
      }
    })
  },[dispatch, open, patientId, firstName, lastName, email, lang])

  const handleClose = (e, success = false) => {
    if(setParentState){
      if(typeof success === 'boolean'){
        setParentState(success)
      } else {
        setParentState(false)
      }
    } else {
      setIsOpen(false)
    }

    //reset the form after fade out
    setTimeout(() => {
      handleNavigate("reset")
    }, 200)
  }

  const updatePatientList = async (activate = false) => {
    const updatedPatients = patients.map(patient => {
      if (patient.patientId === patientId) {
        let returnObj
        if(activate){
          returnObj = {
            ...patient,
            portalAccountStatus: "ACCT_ACTIVE",
          }
        } else {
          returnObj = {
            ...patient,
            firstName: addParticipantContext.firstName,
            lastName: addParticipantContext.lastName,
            email: addParticipantContext.email,
            lang: addParticipantContext.lang,
          }
        }
        return returnObj
      } else {
        return patient
      }
    })
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
    
    loginDispatch({
      type: 'accountActivated',
      patients: updatedPatients
    })
  } // end: updatePatientList

  const saveParticipantData = () => {
    // e.preventDefault()

    getAPI.then(api => {
      api.updateParticipantDetails({
        uuid,
        patient: {
          patientId,
          firstName: addParticipantContext.firstName,
          lastName: addParticipantContext.lastName,
          email: addParticipantContext.email,
          lang: addParticipantContext.lang
        }
      }).then(resp => {
        if(resp instanceof Error) {
          //TODO: perhaps another status message?
          throw resp
        } else {
          // save successful, move to the next step - upload consent form
          dispatch({
            type: "navigate",
            data: "addReport"
          })
          updatePatientList()
        }
      })
      .catch(error => {
        console.error(error)
        dispatch({
          type: "error",
          data: {
            updateUser_error: true,
            navigate: "participantId"
          }
        })
      })
    })
  }

  const saveConsentForm = () => {
    // fake response delay
    // setTimeout(() => {
    // api[env].uploadPatientReport({
    getAPI.then(api => {
      api.uploadPatientReport({
        patientId: addParticipantContext.patientId,
        uuid,
        reportFile: addParticipantContext.file,
        fileType: 'PPE_FILETYPE_ECONSENT_FORM'
      })
      .then(resp => {
        if(resp instanceof Error) {
          throw resp
        } else {
          // Save successful
          dispatch({
            type: 'navigate',
            data: 'finish'
          })
          PubSub.publish('ANALYTICS', {
            events: 'event80',
            eventName: 'NewParticipantComplete',
            prop42: `BioBank_NewParticipant|Completed`,
            eVar42: `BioBank_NewParticipant|Completed`,
          })
        }
      })
      .catch(error => {
        console.error(error)
        // Save unsuccessful - go back a step
        dispatch({
          type: 'error',
          data: {
            upload_error: true,
            navigate: 'addReport'
          }
        })
        PubSub.publish('ANALYTICS', {
          events: 'event81',
          eventName: 'UploadError',
          prop42: `BioBank_ConsentUpload|Error: Failed to upload to server`,
          eVar42: `BioBank_ConsentUpload|Error: Failed to upload to server`,
        })
      })
    })
  // }, 3000)
  }

  const activateParticipant = () => {
    getAPI.then(async api => {
      return await api.activateParticipant({
        uuid,
        token,
        patient: {
          patientId
        }
      })
    })
    .then(resp => {
      if(resp instanceof Error) {
        // Activation unsuccessful - display status error
        throw resp
      } else {
        // update patient data front-end state
        updatePatientList(true).then(() => {
          // save successful, close modal and redirect to Participant View
          navigate(`/account/participant/${patientId}`, {
            state: {
              newParticipantActivated: true
            }
          })
        })
      }
    })
    .catch(error => {
      console.error(error)
      dispatch({
        type: 'error',
        data: {
          activate_error: true,
          navigate: 'addReport'
        }
      })
    })
  }


  const handleNavigate = (to) => {
    switch (to) {
      case 'dashboard':
        navigate('/account')
        break
      case 'reset':
        setActiveStep(0)
        setSubmitText(t('form.save'))
        dispatch({
          type: 'reset'
        })
        break
      case 'participantId':
        setActiveStep(0)
        setSubmitText(t('form.save'))
        break
      case 'addReport':
        setActiveStep(1)
        setSubmitText(t('form.submit'))
        break
      case 'submit':
        if(activeStep === 0) {
          setActiveStep(2)
          saveParticipantData()
        } else if (activeStep === 1) {
          setActiveStep(2)
          saveConsentForm()
        }
        break
      case 'finish': 
        activateParticipant()
        break
      default:
        console.error(`form navigation step '${to}' not found`)
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" disableTypography><Typography variant="h3" component="h3">{t('title')}</Typography></DialogTitle>
      <DialogContent>
        <Typography>{t('subtitle')}</Typography>
        <WorkflowStepper activeStep={activeStep} />
        <Paper elevation={25} className={classes.paper}>
          {activeStep >= 1 && <Typography variant="h3">{addParticipantContext.firstName} {addParticipantContext.lastName}</Typography>}
          <Typography variant={activeStep === 0 ? "h3" : "body1"}>{t('a_common:participant.id')}: {patientId}</Typography>
          <Typography>{t('a_common:participant.since')} {moment(dateCreated).format("MMM DD, YYYY")}</Typography>
        </Paper>
        {activeStep === 0 && (
          // participant ID
          <ParticipantInfo />
        )}
        {activeStep === 1 && (
          // select report to upload
          <AddConsent />
        )}
        {activeStep === 2 && (
          // upload progress. On success - redirected to Participant View
          <Progress title={t('progress')} />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" type="submit" form="activatePatient">{submitText}</Button>
        <Button variant="text" color="primary" className={classes.btnCancel} onClick={handleClose}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddParticipantWorkflow